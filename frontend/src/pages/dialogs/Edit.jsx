import React, { useEffect, useState } from 'react'
import { Dialog,DialogDescription, DialogContent, DialogHeader, DialogTrigger,DialogClose } from "@/components/ui/dialog"
import { useForm } from "react-hook-form"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { getPetition, putPetition } from '../../resources/ApiFunctions'
import { Textarea } from "@/components/ui/textarea"
import { MdEditSquare } from "react-icons/md";
import { Badge } from "@/components/ui/badge"

function Edit({ip,setData}) {
    const[values,setValues] = useState([])
    const [categories,setCategories] = useState([])
    const [activeCategories, setActiveCategories] = useState([]);
    const{register, handleSubmit, setValue, getValues, reset}=useForm({
        defaultValues:{
            id:ip,
            
        }
    })
    const [open, setOpen] = useState(false) 
    useEffect(()=>{
      getPetition('api/Category/List',(response)=>{
        setCategories(response.response)
      })
    },[]) 
    const onSubmit = async(data) => {
        try{
            await putPetition("api/Notes/Edit",data,(response)=>{
                console.log(data);
                console.log(response);
                getPetition('api/Notes/List',(response)=>{
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
                const categoryIds = response.response.noteCategories.map(nc => nc.categoryId);
                setValue('categoryIds', categoryIds);
                setActiveCategories(categoryIds);
            });
                
            };

            
        }
    , [open, ip, setValue]);
    const handleClick = (categoryId) => {
      const currentCategoryIds = getValues("categoryIds") || [];
      const isCategoryActive = activeCategories.includes(categoryId);
      if (isCategoryActive) {
        
        setValue("categoryIds", currentCategoryIds.filter(id => id !== categoryId));
        setActiveCategories(activeCategories.filter(id => id !== categoryId));
      } else {
        
        setValue("categoryIds", [...currentCategoryIds, categoryId]);
        setActiveCategories([...activeCategories, categoryId]);
      }
    };
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
                      <div className='my-4'>
                      {categories.map((cate, index) => (
                    <Badge
                    onClick={() => handleClick(cate.id)}
                    
                    key={index}
                    className={`cursor-pointer ${activeCategories.includes(cate.id) ? 'bg-color1 h-[38px] rounded-xl mx-[2px] items-center justify-center overflow-hidden text-white' : 'text-[#50E3C2] h-[38px] rounded-xl mx-[2px] items-center justify-center overflow-hidden'}`}
                  >
                    {cate.name}
                  </Badge>
                  ))}
                     
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

export default Edit