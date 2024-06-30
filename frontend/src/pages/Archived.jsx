import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '../components/ui/button'
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
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
import { deletePetition, getPetition, putPetition } from '../resources/ApiFunctions'
import { RiArchiveStackFill } from 'react-icons/ri'
import { MdDelete } from 'react-icons/md'
import { Badge } from "@/components/ui/badge"
import Select from 'react-select'
import EditA from './dialogs/EditA'
function Archived() {
    const [data,setData] = useState([])
    const [filteredData, setFilteredData] = useState([]);
    const [error, setError] = useState('');
    const [selectedOption,setSelectedOption]= useState([])
    const [tags,setTags] = useState([])
    const maxOptions = 3;

    const handleChange = (options) =>{
      if(options.length <= maxOptions){
        setSelectedOption(options);
        setError('');
      }else{
        setError(`You can only select up to ${maxOptions} options.`);
      }
      
    }

    useEffect(() => {
      if (selectedOption && selectedOption.length > 0) {
        const selectedIds = selectedOption.map(opt => opt.value);
        const filteredData = data.filter(item =>
          item.noteCategories.some(nc => selectedIds.includes(nc.categoryId))
        );
        setFilteredData(filteredData);
      } else {
        setFilteredData(data);
      }
    }, [selectedOption, data]);

    const options = tags.map(opt =>({
      value: opt.id,
      label: opt.name
    }))

    useEffect(()=>{
        getPetition('api/Notes/Notes',(response)=>{
          setData(response.response)
        })
        getPetition("api/Category/List",(response)=>{
          setTags(response.response)
        })
      },[])

      const handleArchive =  async(id) => {
        const noteToUpdate = data.find(note => note.id === id);
        if (noteToUpdate) {
          const updatedNote = { ...noteToUpdate, archived: false };
          updatedNote.categoryIds = noteToUpdate.noteCategories.map(nc => nc.categoryId);

    
          delete updatedNote.noteCategories;
          console.log(updatedNote);
          try {
            await putPetition("api/Notes/Edit", updatedNote, (response) => {
              console.log(response.response);
              getPetition('api/Notes/Notes',(response)=>{
              
                setData(response.response)})
            });
          } catch (error) {
            console.error('Error updating note:', error);
          }
        }
      };

      const handleDelete = (pe) =>{
        deletePetition(`api/Notes/Delete/${pe}`)
          .then(()=>{
            getPetition('api/Notes/Notes',(response)=>{
              setData(response.response)
            })
    
          })
          .catch((error)=>{
            console.error("Error deleting Note:",error)
          })
      }
      
  return (
    <div className='container'>
        
            <div className='flex mx-3 my-3'>
            <h2 className="scroll-m-20  pb-2 text-3xl font-semibold tracking-tight first:mt-0 mr-5">Archived Notes</h2>
                <Link to="/">
                <Button >Back to active notes</Button>
                </Link>
            </div>
            <div>
        <Select options={options}
                value={selectedOption}
                onChange={handleChange}
                isMulti={true}/>
                {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
            <div className="grid grid-cols-4">
          {filteredData.map((filter)=>(
            <Card key={filter.id} className="mx-3 my-3">
            <CardHeader>
              <CardTitle className="line-clamp-1 h-7">{filter.title}</CardTitle>
              <CardContent className="line-clamp-3 p-1 h-20">{filter.content}</CardContent>
              
              <CardContent className='grid grid-cols-3  p-0 '>{filter.noteCategories && filter.noteCategories.map((filt)=>(
                  <Badge  className='rounded-xl  text-xs items-center justify-center text-[#50E3C2] w-[70px] h-[38px] mx-[2px]' key={filt.category.id}>{filt.category.name}</Badge>
              ))}</CardContent>
              <CardFooter className='flex justify-end pt-5'>
                <RiArchiveStackFill className='text-2xl mr-2 ' onClick={() => handleArchive(filter.id)}/>
                
                <EditA  setData={setData} ip={filter.id}/>
                <AlertDialog >
                  <AlertDialogTrigger ><MdDelete className='text-2xl mr-2'/></AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Are you sure you want delete this Note?</AlertDialogTitle>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>No</AlertDialogCancel>
                      <AlertDialogAction onClick={() => handleDelete(filter.id)}>Yes</AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>

                
              </CardFooter>
              
            </CardHeader>
          </Card>
          ))
          }
          
          

          
    </div>
    </div>
  )
}

export default Archived