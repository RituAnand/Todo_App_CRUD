import React, { useState, Fragment } from "react";
import AddUserForm from "./AddTodo/AddTodo";
import UserTable from "./Todolists/Todo-Items";
import './index.css'
import Color from './ColorPallete/Color'
const App = () => {
  // Data
  const usersData = [
    { id: "1tanblue", name: "Tania", isSelected: false ,color:'blue'},
    { id: "2craigbro", name: "Craig", isSelected: false,color:'brown' },
    { id: "3benpurlp", name: "Ben", isSelected: false ,color:'purple'}
  ];

  const initialFormState = { id: null, name: "", isSelected: false ,color:""};

  // Setting state
  const [users, setUsers] = useState(usersData);
  const [currentUser, setCurrentUser] = useState(initialFormState);
  const [editing, setEditing] = useState(false);
  const [coloring,setColoring]=useState("blue")
  const [colors,setColor]=useState(
    [{color:"blue",isSelect:true},
    {color:"orange",isSelect:false},
    {color:"purple",isSelect:false},
    {color:"red",isSelect:false},
    {color:"#303f9f",isSelect:false},
    {color:"#00838f",isSelect:false},
    {color:"#ef6c00",isSelect:false},
    {color:"#795548",isSelect:false},
    {color:"#33691e",isSelect:false},
    {color:"#616161",isSelect:false},
    {color:"#880e4f",isSelect:false},
    {color:"#006064",isSelect:false}])
    const [visible,setVisible]=useState(false)

    const hadleSelect=(index)=>{
      const item=[...colors];
      const prevIndex=item.findIndex(e=>e.isSelect);
      if(prevIndex>=0){
          item[prevIndex].isSelect=false;
      }
      
      item[index].isSelect=!item[index].isSelect;
      setColor(item);
      setColoring(item[index].color);
      setVisible(!visible)
    }
  // CRUD operations
  const addUser = user => {
    if(!coloring || !user.name) return;
    user.id = (Date.now().toString(36) + Math.random().toString(36).substr(2, 5)).toUpperCase();
    user.isSelected = false;
    user.color=coloring;
    setUsers([...users, user]);
  };

  const deleteUser = id => {
    setEditing(false);

    setUsers(users.filter(user => user.id !== id));
  };

  const updateUser = (id, updatedUser) => {
    setEditing(false);
   console.log("update user",updatedUser)
    setUsers(users.map(user => (user.id === id ? updatedUser : user)));
  };


  const editRow = user => {
    setEditing(true);

    setCurrentUser({
      id: user.id,
      name: user.name,
      isSelected: user.isSelected,
      color:user.color
    });
  };



  return (
    <div style={{paddingLeft:'1%',paddingRight:'1%'}}> 
      <div>
        <div className="flex-large">
          <h2 style={{display:'flex', justifyContent:"center", alignItems:'center',boxShadow:'0 4px 8px 0 rgba(0,0,0,0.2)',padding:'1%',color:'white',backgroundColor:'#67809F'}}>Todo Lists</h2>
          <UserTable
            users={users}
            editRow={editRow}
            deleteUser={deleteUser}
            
            editing={editing}
            setEditing={setEditing}
            currentUser={currentUser}
            updateUser={updateUser}
          />
          { (
            <Fragment>
              <div style={{display:'flex',flexDirection:'row'}}>
                
                <AddUserForm addUser={addUser} setEditing={setEditing} />
                <button  style={{background:coloring,outline:'none',border:'none',color:'white',margin: '8px',borderRadius:'4px'}} onClick={()=>setVisible(!visible)}>
                 Color
                </button>
              </div>
              {visible?<Color  colors={colors} hadleSelect={hadleSelect}/>:null}
              
            </Fragment>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
