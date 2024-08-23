import Layout from "@/components/Layout";
import axios from "axios";
import { useState, useEffect } from "react";
import { getSession } from "next-auth/react";

export async function getServerSideProps(context) {
    const session = await getSession(context);
  
    if (!session || session.user.role !== 'admin') {
      return {
        redirect: {
          destination: '/Login',
          permanent: false,
        },
      };
    }
  
    return {
      props: { session },
    };
  }

export default function AdminPage() {
  const [adminList, setAdminList] = useState([]);
  const [email, setEmail] = useState('');
  const [editingEmail, setEditingEmail] = useState(null);

  useEffect(() => {
    fetchAdmins();
  }, []);

  function fetchAdmins() {
    axios.get('/api/AdminHandler')
      .then(result => {
        setAdminList(result.data);
      })
      .catch(err => console.error("Error fetching admins: ", err));
  }

  function addAdmin(ev) {
    ev.preventDefault();
    axios.post('/api/AdminHandler', { email })
      .then(result => {
        setAdminList([...adminList, result.data]);
        setEmail('');
      })
      .catch(err => console.error("Error adding admin: ", err));
  }

  function startEditing(admin) {
    setEmail(admin.email);
    setEditingEmail(admin.email);
  }

  function editAdmin(ev) {
    ev.preventDefault();
    axios.put('/api/AdminHandler', { email: editingEmail, newEmail: email })
      .then(result => {
        setAdminList(adminList.map(admin => admin.email === editingEmail ? result.data : admin));
        setEmail('');
        setEditingEmail(null);
      })
      .catch(err => console.error("Error editing admin: ", err));
  }

  function deleteAdmin(email) {
    axios.delete('/api/AdminHandler', { data: { email } })
      .then(() => {
        setAdminList(adminList.filter(admin => admin.email !== email));
      })
      .catch(err => console.error("Error deleting admin: ", err));
  }

  return (
    <Layout>
      <div className="flex flex-col">
          <h1 className="this">Admins page</h1>
          <form onSubmit={editingEmail ? editAdmin : addAdmin}>
            <label className="this">{editingEmail ? "Edit admin" : "Add an admin"}</label>
            <input value={email} onChange={e => setEmail(e.target.value)} type="email" className="this" required />
            <dev className="flex gap-2">
                <button type="submit" className="edit-btn">{editingEmail ? "Update" : "Add"}</button>
                {editingEmail && <button onClick={() => { setEmail(''); setEditingEmail(null); }} className="edit-btn !bg-gray-200 !hover:bg-gray-300">Cancel</button>}
            </dev>
                </form>
          <table className="basic">
            <thead>
              <tr>
                <td><b>Admins</b></td>
              </tr>
            </thead>
            <tbody>
              {adminList.length > 0 && adminList.map(admin => (
                <tr key={admin.email}>
                  <td>{admin.email}</td>
                  <td className="flex gap-2">
                    <button className="delete-btn" onClick={() => deleteAdmin(admin.email)}>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                      </svg>
                      Delete
                    </button>
                    <button className="edit-btn" onClick={() => startEditing(admin)}>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className=" size-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                      </svg>
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
      </div>
    </Layout>
  );
}
