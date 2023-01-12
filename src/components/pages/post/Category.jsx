import React, {useEffect, useState} from 'react'

export const Category = ({data, checkedItems, checkedItemHandler}) => {
    const [isChecked, setIsChecked] = useState(null)

    const onCheck = ({target}) => {
        checkedItemHandler(target.value, target.checked)
        setIsChecked(target.checked)
    }

    useEffect(()=>{
        if(checkedItems.includes(data)){
            setIsChecked(true)
        }else{
            setIsChecked(false)
        }
    }, [checkedItems, data])

    return (
        <button
            checked = {isChecked}
            onClick = {e => onCheck(e)}
            value = {data}
            className = "min-w-max pt-4 pb-4 rounded-2xl border flex hover:scale-105 transition focus:outline-none focus:ring focus:ring-sky-300"
        >

          <img className="m-auto w-12 h-12" src={data.img} alt={data.name} />
          <h3 className="m-auto text-2xl font-weight-bold">{data.name}</h3>
      </button>
    )
}

export default Category;
