import React, { useEffect, useState } from 'react'
import { Dialog,DialogDescription, DialogContent, DialogHeader, DialogTrigger,DialogClose } from "@/components/ui/dialog"
import { useForm } from "react-hook-form"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { getPetition, postPetition } from '../../resources/ApiFunctions'
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"

function Create({setData}) {
const [categories,setCategories] = useState([])
const [activeCategories, setActiveCategories] = useState([]);
const [open, setOpen] = useState(false)
const [newCategory,setNewCategory] = useState('')
const getCurrentTime = () => {
    const now = new Date();
    return now.toISOString();
  };
  const { register, handleSubmit, setValue, getValues, reset } = useForm({
    defaultValues: {
      created: getCurrentTime(),
      archived: false,
      categoryIds: []
    }
  })
useEffect(()=>{
    getPetition('api/Category/List',(response)=>{
      setCategories(response.response)
    })
  },[])
  useEffect(() => {
    if (!open) {
      reset({
        created: getCurrentTime(),
        archived: false,
        categoryIds: []
      });
    }
  }, [open, reset]);


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

const onSubmit = async(data) => {
    try{
        await postPetition("api/Notes/Save",data,(response)=>{
            console.log(response);
            getPetition('api/Notes/List',(response)=>{
                setOpen(false)
                setData(response.response)})
        }
        )
    }catch(error){
        console.log('Error creating Note',error);
    }
}
    /* const onSubmit = (data) => console.log(data) */

console.log(newCategory);


  return (
    <Dialog  open={open} onOpenChange={setOpen}>
              <DialogTrigger><Button >Create Note</Button></DialogTrigger>
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
                        <div className='mt-5'>
                  {categories.map((cate, index) => (
                    <Badge
                    onClick={() => handleClick(cate.id)}
                    key={index}
                    className={`cursor-pointer ${activeCategories.includes(cate.id) ? 'bg-color1 h-[38px] rounded-xl mx-[2px] items-center justify-center overflow-hidden text-white' : 'text-[#50E3C2] h-[38px] rounded-xl mx-[2px] items-center justify-center overflow-hidden'}`}
                  >
                    {cate.name}
                  </Badge>
                  ))}
                  <div className='flex mt-5 '>
                  <Button onClick={(e) => {
              e.preventDefault(); try{
                const datum = {name:newCategory}
                 postPetition("api/Category/Save",datum,(response)=>{
                    console.log(response);
                    getPetition('api/Category/List',(response)=>{
                      setOpen(true)
                      setCategories(response.response)})
                }
                )
            }catch(error){
                console.log('Error creating Note',error);
            }
            }}>New Tag</Button>
                    <Input value={newCategory} onChange={(e)=>setNewCategory(e.target.value)} className="ml-3" type="text" />
                  </div>
                </div>

                      </div>
                      
                      <Button type="submit" >Save</Button>
                        <DialogClose asChild>
                            <Button className="mx-6" type="button" variant="secondary">
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

export default Create