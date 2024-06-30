import React, { useEffect, useState } from 'react'
import { deletePetition, getPetition, putPetition,postPetition } from '@/resources/ApiFunctions'
import { Dialog,DialogDescription, DialogContent, DialogHeader, DialogTrigger,DialogClose } from "@/components/ui/dialog"
import { Button } from '@/components/ui/button'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { MdDelete } from "react-icons/md";
import { Input } from '@/components/ui/input'
import { MdEditSquare,MdCheck  } from "react-icons/md";
function Tags({setData}) {
  const [tags, setTags] = useState([])
  const [open, setOpen] = useState(false)
  const [editingTagId, setEditingTagId] = useState(null);
  const [currentName, setCurrentName] = useState('');
  const [newTag, setNewTag] = useState('');
  const [error, setError] = useState('');
  
    useEffect(()=>{
        getPetition('api/Category/List',(response)=>{
          setTags(response.response)
        })
      },[])
      const handleDelete = (pe) =>{
        deletePetition(`api/Category/Delete/${pe}`)
          .then(()=>{
            getPetition('api/Category/List',(response)=>{
              setTags(response.response)
            })
    
          })
          .catch((error)=>{
            console.error("Error deleting Note:",error)
          })
      }
      const handleEditToggle = (id) => {
        if (editingTagId === id) {
          setEditingTagId(null);
        } else {
          setEditingTagId(id); 
        }
      };
      const handleSave = async(id) => {
        if (currentName.trim() === '') {
          setError('Name cannot be empty');
          return;
        }
        const updateTag={
          id:id,name:currentName
        }
        
        try {
          await putPetition("api/Category/Edit",updateTag,(response)=>{
            console.log(response);
            console.log(updateTag);
            getPetition('api/Category/List',(response)=>{
              setTags(response.response)  
            })
            getPetition('api/Notes/List',(response)=>{
              setData(response.response)
            })
              
        });
        } catch (error) {
          console.error('Error updating Category:', error);
        }
        console.log("Saving tag with ID:", id);
        setEditingTagId(null);
      };
      const handleNew = async() => {
        if (newTag.trim() === '') {
          setError('Name cannot be empty');
          return;
        }
        try {
          await postPetition("api/Category/Save",{name:newTag},(response)=>{
            console.log(newTag);
            console.log(response);
            getPetition('api/Category/List',(response)=>{
              setTags(response.response)})
              
        });
        } catch (error) {
          console.error('Error updating reader configuration:', error);
        }
      };
      
  return (
    <Dialog open={open} onOpenChange={setOpen}>
    <DialogTrigger><Button className="ml-2">Tags</Button></DialogTrigger>
    <DialogContent>
      <DialogHeader>
        <DialogDescription>
          {tags.map((filter) => (
            <div key={filter.id} className="grid grid-cols-12 justify-center items-center ">
              <Input
                className="col-span-8 border-2 border-color1 rounded-sm bg-color2 text-white m-1"
                disabled={editingTagId !== filter.id}
                onChange={(e) =>setCurrentName(e.target.value)}
                defaultValue={filter.name}
                type="text"
              />
              <div className="col-span-2">
              {editingTagId === filter.id ? (
                    <MdCheck onClick={() => handleSave(filter.id)}  className='text-2xl ml-2 cursor-pointer' />
                  ) : (
                    <MdEditSquare onClick={() => handleEditToggle(filter.id)} className='text-2xl ml-2 cursor-pointer' />
                  )}
              </div>
              <div className="col-span-2">
                <AlertDialog>
                  <AlertDialogTrigger><MdDelete className='text-2xl mr-2 text-red-500' /></AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Are you sure you want delete this Tag?</AlertDialogTitle>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>No</AlertDialogCancel>
                      <AlertDialogAction onClick={() => handleDelete(filter.id)}>Yes</AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
              {editingTagId === filter.id && error && (
                  <div className="col-span-12 text-red-500 text-center">
                    {error}
                  </div>
                )}
            </div>
          ))}
          <div className="flex p-1">
            <Input type="text" onChange={(e)=>setNewTag(e.target.value)}/>
            <Button onClick={handleNew} className="ml-6">Add new Tag</Button>
            
          </div>
          { error && (
                  <div className="col-span-12 text-red-500 text-center">
                    {error}
                  </div>
                )}
        </DialogDescription>
      </DialogHeader>
    </DialogContent>
  </Dialog>
  )
}

export default Tags