import React, { ChangeEvent } from 'react';
import { useTodoList } from './useTodoList';

export default function TodoList() {
  const {
    todos,
    newTodo,
    setNewTodo,
    newPriority,
    setNewPriority,
    newDescription,
    setNewDescription,
    editingTodo,
    editMode,
    editedTitle,
    setEditedTitle,
    editedPriority,
    setEditedPriority,
    editedDescription,
    setEditedDescription,
    handleDelete,
    handleEditStart,
    handleEditSave,
    handleEditCancel,
    handleToggleComplete,
    handleLogout,
    getPriorityColor,
    showAddForm,
    toggleAddForm,
    day,
    week,
    month,
    year,
    handleSubmit,
    username,
  } = useTodoList();

  return (
    <div className='bg-white'>
      <nav className="bg-white py-5">
        <div className="container mx-auto px-5">
          <div className="flex items-center justify-between">
            <div className="text-black font-bold grid grid-cols-3">
              <div className='text-5xl row-span-2'>{day}</div>
              <div>{week}</div>
              <div className='grid grid-cols-subgrid col-span-2 col-start-2'>{month} {year}</div>
            </div>
            <button
              onClick={toggleAddForm}
              className="ml-2 px-4 py-2 text-black bg-white font-bold rounded-md hover:bg-gray-400 "
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-10 h-10 inline-block pr-4 text-pink-500">
                <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 9a.75.75 0 0 0-1.5 0v2.25H9a.75.75 0 0 0 0 1.5h2.25V15a.75.75 0 0 0 1.5 0v-2.25H15a.75.75 0 0 0 0-1.5h-2.25V9Z" clipRule="evenodd" />
              </svg>
              New Task
            </button>
            <div className="text-lg text-black">
              {username}
            </div>
          </div>
        </div>
      </nav>
      <div className='bg-white'>
        {showAddForm && (
          <form onSubmit={handleSubmit} className="mb-4 mt-2 container mx-auto px-5 py-5 bg-gray-100">
            <input
              type="text"
              value={newTodo}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setNewTodo(e.target.value)}
              className="text-black ml-2 px-4 py-2 border rounded-md"
              placeholder="Title"
              required
            />
            <input
              type="text"
              value={newDescription}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setNewDescription(e.target.value)}
              className="text-black ml-2 mt-2 px-4 py-2 border rounded-md"
              placeholder="Description"
            />
            <select
              value={newPriority}
              onChange={(e: ChangeEvent<HTMLSelectElement>) => setNewPriority(e.target.value as 'low' | 'normal' | 'high')}
              className="text-black ml-2 px-4 py-2 border rounded-md"
            >
              <option value="low">Low</option>
              <option value="normal">Normal</option>
              <option value="high">High</option>
            </select>
            <button
              type="submit"
              className="ml-2 px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700"
            >
              Add
            </button>
          </form>
        )}
      </div>
      <div className='bg-white'>
        <div className="bg-white container mx-auto px-4 py-8">
          <div className='text-black text-center border-t-4 border-t-gray border-dashed font-bold pt-5'>TODO TASKS</div>
          <ul>
            {todos.filter(todo => !todo.completed).map(todo => (
              <li key={todo.id} className={`flex justify-between items-center p-2 border-b ${getPriorityColor(todo.priority, todo.completed)} rounded-md py-5 text-white my-3`}>
                <div className="flex items-center">
                  <div>
                    {editMode && editingTodo?.id === todo.id ? (
                      <>
                        <input
                          type="text"
                          value={editedTitle}
                          onChange={(e: ChangeEvent<HTMLInputElement>) => setEditedTitle(e.target.value)}
                          className="text-black px-4 py-2 border rounded-md mr-2"
                          placeholder='Title'
                        />
                        <select
                          value={editedPriority}
                          onChange={(e: ChangeEvent<HTMLSelectElement>) => setEditedPriority(e.target.value as 'low' | 'normal' | 'high')}
                          className="text-black px-4 py-2 border rounded-md mr-2"
                        >
                          <option value="low">Low</option>
                          <option value="normal">Normal</option>
                          <option value="high">High</option>
                        </select>
                        <input
                          type="text"
                          value={editedDescription}
                          onChange={(e: ChangeEvent<HTMLInputElement>) => setEditedDescription(e.target.value)}
                          className="text-black px-4 py-2 border rounded-md mr-2 mt-2"
                          placeholder="Description"
                        />
                        <button
                          onClick={handleEditSave}
                          className="px-4 py-2 text-white bg-green-600 rounded-md hover:bg-green-700 mr-2"
                        >
                          Save
                        </button>
                        <button
                          onClick={handleEditCancel}
                          className="px-4 py-2 text-white bg-gray-600 rounded-md hover:bg-gray-700"
                        >
                          Cancel
                        </button>
                      </>
                    ) : (
                      <>
                        <span className={`ml-2 text-white rounded-md px-2 ${getPriorityColor(todo.priority, todo.completed)}`}>
                          {todo.priority.charAt(0).toUpperCase() + todo.priority.slice(1)}
                        </span>
                        <div className="ml-2 font-bold">{todo.title}</div>
                        <div className="ml-2 text-sm">{todo.description}</div>
                      </>
                    )}
                  </div>
                </div>
                <div>
                  <input
                    type="radio"
                    checked={todo.completed}
                    onChange={() => handleToggleComplete(todo.id)}
                    className="mr-2 h-8 w-8"
                  />
                  {!editMode && (
                    <button
                      onClick={() => handleEditStart(todo)}
                      className="px-4 py-2 text-white bg-yellow-600 rounded-md hover:bg-yellow-700 mr-2"
                    >
                      Edit
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(todo.id)}
                    className="px-4 py-2 text-white bg-red-600 rounded-md hover:bg-red-700"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className='bg-white'>
        <div className="bg-white container mx-auto px-4 py-8">
          <div className='text-black text-center border-t-4 border-t-gray border-dashed font-bold pt-5'>DONE TASKS</div>
          <ul>
            {todos.filter(todo => todo.completed).map(todo => (
              <li key={todo.id} className={`flex justify-between items-center p-2 border-b ${getPriorityColor(todo.priority, todo.completed)} rounded-md py-5 text-white my-3`}>
                <div className="flex items-center">
                  <div>
                    {editMode && editingTodo?.id === todo.id ? (
                      <>
                        <input
                          type="text"
                          value={editedTitle}
                          onChange={(e: ChangeEvent<HTMLInputElement>) => setEditedTitle(e.target.value)}
                          className="text-black px-4 py-2 border rounded-md mr-2"
                          placeholder='Title'
                        />
                        <select
                          value={editedPriority}
                          onChange={(e: ChangeEvent<HTMLSelectElement>) => setEditedPriority(e.target.value as 'low' | 'normal' | 'high')}
                          className="text-black px-4 py-2 border rounded-md mr-2"
                        >
                          <option value="low">Low</option>
                          <option value="normal">Normal</option>
                          <option value="high">High</option>
                        </select>
                        <input
                          type="text"
                          value={editedDescription}
                          onChange={(e: ChangeEvent<HTMLInputElement>) => setEditedDescription(e.target.value)}
                          className="text-black px-4 py-2 border rounded-md mr-2 mt-2"
                          placeholder="Description"
                        />
                        <button
                          onClick={handleEditSave}
                          className="px-4 py-2 text-white bg-green-600 rounded-md hover:bg-green-700 mr-2"
                        >
                          Save
                        </button>
                        <button
                          onClick={handleEditCancel}
                          className="px-4 py-2 text-white bg-gray-600 rounded-md hover:bg-gray-700"
                        >
                          Cancel
                        </button>
                      </>
                    ) : (
                      <>
                        <span className={`ml-2 text-white rounded-md px-2 ${getPriorityColor(todo.priority, todo.completed)}`}>
                          {todo.priority.charAt(0).toUpperCase() + todo.priority.slice(1)}
                        </span>
                        <div className="ml-2 font-bold">{todo.title}</div>
                        <div className="ml-2 text-sm">{todo.description}</div>
                      </>
                    )}
                  </div>
                </div>
                <div>
                  <input
                    type="radio"
                    checked={todo.completed}
                    onChange={() => handleToggleComplete(todo.id)}
                    className="mr-2 h-8 w-8"
                  />
                  {!editMode && (
                    <button
                      onClick={() => handleEditStart(todo)}
                      className="px-4 py-2 text-white bg-yellow-600 rounded-md hover:bg-yellow-700 mr-2"
                    >
                      Edit
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(todo.id)}
                    className="px-4 py-2 text-white bg-red-600 rounded-md hover:bg-red-700"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="flex items-center justify-center mt-5 mb-5">
        <button
          onClick={handleLogout}
          className="px-4 py-2 text-white bg-red-600 rounded-md hover:bg-red-700"
        >
          Logout
        </button>
      </div>
      <footer className="bg-gray-100 text-black p-10 text-center">
      <div>
        &copy; {new Date().getFullYear()} My App. All rights reserved.
      </div>
    </footer>
    </div>
  );
}
