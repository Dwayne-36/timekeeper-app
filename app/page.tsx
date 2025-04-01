'use client'
import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'

export default function Home() {
  const [names, setNames] = useState<any[]>([])
  const [newName, setNewName] = useState('')
  const [editId, setEditId] = useState<number | null>(null)
  const [editName, setEditName] = useState('')

  useEffect(() => {
    fetchNames()
  }, [])

  const fetchNames = async () => {
    const { data, error } = await supabase.from('test_table').select('*')
    if (error) {
      console.error('Error fetching names:', error.message)
    } else {
      setNames(data || [])
    }
  }

  const addName = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newName) return

    const { error } = await supabase.from('test_table').insert({ name: newName })
    if (error) {
      alert('Insert failed: ' + error.message)
    } else {
      setNewName('')
      fetchNames()
    }
  }

  const deleteName = async (id: number) => {
    const { error } = await supabase.from('test_table').delete().eq('id', id)
    if (error) {
      alert('Delete failed: ' + error.message)
    } else {
      fetchNames()
    }
  }

  const startEdit = (id: number, name: string) => {
    setEditId(id)
    setEditName(name)
  }

  const saveEdit = async () => {
    if (editId === null) return

    const { error } = await supabase
      .from('test_table')
      .update({ name: editName })
      .eq('id', editId)

    if (error) {
      alert('Update failed: ' + error.message)
    } else {
      setEditId(null)
      setEditName('')
      fetchNames()
    }
  }

  return (
    <main style={{ padding: '2rem' }}>
      <h1>Supabase Test</h1>

      <form onSubmit={addName} style={{ marginBottom: '1rem' }}>
        <input
          type="text"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          placeholder="Enter a name"
          style={{ marginRight: '0.5rem' }}
        />
        <button type="submit">Add</button>
      </form>

      {names.map((item) => (
        <div key={item.id} style={{ marginBottom: '10px' }}>
          {editId === item.id ? (
            <>
              <input
                type="text"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                style={{ marginRight: '0.5rem' }}
              />
              <button onClick={saveEdit}>Save</button>
              <button onClick={() => setEditId(null)} style={{ marginLeft: '5px' }}>Cancel</button>
            </>
          ) : (
            <>
              {item.name}
              <button
                onClick={() => startEdit(item.id, item.name)}
                style={{ marginLeft: '10px' }}
              >
                Edit
              </button>
              <button
                onClick={() => deleteName(item.id)}
                style={{ marginLeft: '5px' }}
              >
                Delete
              </button>
            </>
          )}
        </div>
      ))}
    </main>
  )
}
