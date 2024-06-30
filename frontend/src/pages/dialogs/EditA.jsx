import React, { useEffect, useState } from 'react'
import { Dialog,DialogDescription, DialogContent, DialogHeader, DialogTrigger,DialogClose } from "@/components/ui/dialog"
import { useForm } from "react-hook-form"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { getPetition, putPetition } from '../../resources/ApiFunctions'
import { Textarea } from "@/components/ui/textarea"
import { MdEditSquare } from "react-icons/md";
function EditA({ip,setData}) {
    const[values,setValues] = useState([])
    const{register,handleSubmit,setValue}=useForm({
        defaultValues:{
            id:ip,
            archived:true,
            title:null,
            content:null
        }
    })
    const [open, setOpen] = useState(false)  
    const onSubmit = async(data) => {
        try{
            await putPetition("api/Notes/Edit",data,(response)=>{
                console.log(response);
                getPetition('api/Notes/Notes',(response)=>{
                    setOpen(false)
                    setData(response.response)})
            })
           
        }catch(error){
            console.log('Error updating note:',error);
        }
    }
    
    useEffect(()=>{
        
        setValue('title',values.title)
        setValue('content',values.content)
        getPetition(`api/Notes/Obtain/${ip}`,(response)=>{
            setValues(response.response)
          })
    },[])
    useEffect(() => {
      if (open) {
          getPetition(`api/Notes/Obtain/${ip}`,(response)=>{
              setValues(response.response);

              setValue('title', response.response.title);
              setValue('content', response.response.content);
          });
              
          };

          
      }
  , [open, ip, setValue]);
    console.log(values);
  return (
    <Dialog  open={open} onOpenChange={setOpen}>
              <DialogTrigger><MdEditSquare className='text-2xl mr-2'/></DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogDescription>
                     <form onSubmit={handleSubmit(onSubmit)}>
                                                                                                                                                                            
                      <div className='my-4'>
                        <label className=''>
                          Title:
                        </label>
                        <Input {...register('title')} type="text" />
                      </div>
                      <div className="mb-8">
                        <label className='mb-2'>
                          Content:
                        </label>
                        <Textarea {...register('content')} />
                        

                      </div>
                      
                      <Button type="submit">Save</Button>
                        <DialogClose asChild>
                            <Button type="button" variant="secondary">
                              Close
                            </Button>
                        </DialogClose>
                     </form>
                      
                    </DialogDescription>
                  </DialogHeader>
                </DialogContent>
              </Dialog>
  )
}

export default EditA