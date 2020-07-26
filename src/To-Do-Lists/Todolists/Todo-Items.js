import React, { useState, useEffect } from "react";

import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import ListItem from "@material-ui/core/ListItem";
import Check from "@material-ui/icons/Check";
import "./Todo-Items.css";

const UserTable = props => {
  const [editUser, setUser] = useState(props.currentUser);

  useEffect(() => {
    setUser(props.currentUser);
  }, [props]);
  // You can tell React to skip applying an effect if certain values haven’t changed between re-renders. [ props ]

  const handleInputChange = event => {
    const { name, value} = event.target;

    setUser({ ...editUser, [name]: value });
  };

  
  const completeUser = id => {
    console.log("getting into the check user")
    props.setEditing(false);
    let checked = props.users.findIndex(user => user.id === id);
    let newUser = props.users[checked];
    newUser.isSelected = !newUser.isSelected;
    //setUser(newUser);
    props.updateUser(id,newUser)
  };

  return (
    <div>
      {props.users.length > 0 ? (     
              <div style={{boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',borderRadius: '5px',backgroundColor:'#E1E5EC'}}>
                {props.users.map((user, index) => (                      
                          <ListItem
                            key={user.id}
                            className="todo_lists"
                            style={{
                              justifyContent: "space-between",width:'100%'
                            }}
                          >
                            <div className="todo_name">
                              <div className="todo_check">
                                <div>
                                  <button
                                    key={index}
                                    onClick={() => completeUser(user.id)}
                                    style={{
                                      background: "transparent",border: "none",outline: "none" }}
                                    >
                                    <div 
                                    className="todo_circle"
                                      style={{
                                        background:user.isSelected?user.color:"white",
                                        borderColor:user.isSelected?user.color:user.color,
                                      }}
                                    >
                                      {user.isSelected ? (
                                        <Check className="checked"
                                          style={{
                                            fontSize: "15px",
                                            color:'white'
                                          }}
                                        />
                                      ) : null}
                                    </div>
                                  </button>
                                </div>
                                {props.editing && editUser.id === user.id ? (
                                  <form
                                    onSubmit={event => {
                                      event.preventDefault();
                                      props.updateUser(editUser.id, editUser);
                                    }}
                                    style={{ marginLeft: "10",width:'100%' }}
                                  >
                                    <input
                                      type="text"
                                      name="name"
                                      value={editUser.name}
                                      onChange={handleInputChange}
                                     style={{width:"100%"}}
                                    />
                                  </form>
                                ) : (
                                  <div
                                    style={{ marginLeft: 20, textDecoration:user.isSelected ?'line-through':"none"}}
                                    numberoflines={1}
                                  >
                                    {user.name}
                                  </div>
                                )}
                              </div>
                            </div>

                            {props.editing && editUser.id === user.id ? null : (
                              <div className="todo_editdelete">
                                <div style={{ marginRight: "7%" }}>
                                  <EditIcon style={{color:'#555555'}}
                                    onClick={() => {
                                      props.editRow(user);
                                    }}
                                  />
                                </div>
                                <div style={{ marginRight: "7%" }}>
                                  <DeleteIcon style={{color:'#E7505A'}}
                                    onClick={() => props.deleteUser(user.id)}
                                  />
                                </div>
                              </div>
                            )}
                          </ListItem>                   
                ))}               
              </div>            
      ) : (
        <div>
          <div colSpan={3}>No todos</div>
        </div>
      )}
    </div>
  );
};

export default UserTable;
