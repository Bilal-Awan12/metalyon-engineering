import React, { createContext, useContext, useReducer, useEffect, useCallback } from 'react'

export interface QuoteItem {
  id:          string
  productId:   string
  name:        string
  quantity:    number
  options:     Record<string, string>
  imageUrl:    string
}

interface QuoteListState {
  items:    QuoteItem[]
  isOpen:   boolean
}

type Action =
  | { type: 'ADD';    payload: Omit<QuoteItem, 'id'> }
  | { type: 'REMOVE'; id: string }
  | { type: 'UPDATE_QTY'; id: string; qty: number }
  | { type: 'TOGGLE_DIALOG' }
  | { type: 'CLOSE_DIALOG' }
  | { type: 'LOAD'; items: QuoteItem[] }

const LS_KEY = 'metalyon-quote-list-v1'
const MAX_ITEMS = 20
const MAX_QTY   = 20

function uid() {
  return Math.random().toString(36).slice(2, 10)
}

function safeLoad(): QuoteItem[] {
  try {
    const raw = localStorage.getItem(LS_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    if (!Array.isArray(parsed)) return []
    return parsed.slice(0, MAX_ITEMS)
  } catch { return [] }
}

function safeSave(items: QuoteItem[]) {
  try { localStorage.setItem(LS_KEY, JSON.stringify(items)) } catch { /* noop */ }
}

function reducer(state: QuoteListState, action: Action): QuoteListState {
  switch (action.type) {
    case 'LOAD':
      return { ...state, items: action.items }
    case 'ADD': {
      if (state.items.length >= MAX_ITEMS) return state
      const existing = state.items.find(
        i => i.productId === action.payload.productId &&
             JSON.stringify(i.options) === JSON.stringify(action.payload.options)
      )
      if (existing) {
        return {
          ...state,
          items: state.items.map(i =>
            i.id === existing.id
              ? { ...i, quantity: Math.min(i.quantity + action.payload.quantity, MAX_QTY) }
              : i
          ),
        }
      }
      return {
        ...state,
        items: [...state.items, { ...action.payload, id: uid() }],
      }
    }
    case 'REMOVE':
      return { ...state, items: state.items.filter(i => i.id !== action.id) }
    case 'UPDATE_QTY':
      return {
        ...state,
        items: state.items.map(i =>
          i.id === action.id ? { ...i, quantity: Math.max(1, Math.min(action.qty, MAX_QTY)) } : i
        ),
      }
    case 'TOGGLE_DIALOG':
      return { ...state, isOpen: !state.isOpen }
    case 'CLOSE_DIALOG':
      return { ...state, isOpen: false }
    default:
      return state
  }
}

interface QuoteListCtx {
  items:        QuoteItem[]
  count:        number
  isOpen:       boolean
  add:          (item: Omit<QuoteItem, 'id'>) => void
  remove:       (id: string) => void
  updateQty:    (id: string, qty: number) => void
  toggleDialog: () => void
  closeDialog:  () => void
}

const QuoteListContext = createContext<QuoteListCtx | null>(null)

export function QuoteListProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, { items: [], isOpen: false })

  useEffect(() => {
    dispatch({ type: 'LOAD', items: safeLoad() })
  }, [])

  useEffect(() => {
    safeSave(state.items)
  }, [state.items])

  const add          = useCallback((item: Omit<QuoteItem, 'id'>) => dispatch({ type: 'ADD', payload: item }), [])
  const remove       = useCallback((id: string)                   => dispatch({ type: 'REMOVE', id }), [])
  const updateQty    = useCallback((id: string, qty: number)      => dispatch({ type: 'UPDATE_QTY', id, qty }), [])
  const toggleDialog = useCallback(()                              => dispatch({ type: 'TOGGLE_DIALOG' }), [])
  const closeDialog  = useCallback(()                              => dispatch({ type: 'CLOSE_DIALOG' }), [])

  const count = state.items.reduce((s, i) => s + i.quantity, 0)

  return (
    <QuoteListContext.Provider value={{ items: state.items, count, isOpen: state.isOpen, add, remove, updateQty, toggleDialog, closeDialog }}>
      {children}
    </QuoteListContext.Provider>
  )
}

export function useQuoteList() {
  const ctx = useContext(QuoteListContext)
  if (!ctx) throw new Error('useQuoteList must be used inside QuoteListProvider')
  return ctx
}
