import React from 'react'

const Die = ({value, isHeld, holdDice}) => {

    const styles = {
        backgroundColor: isHeld ? "#90EE90" : "#C8C8C8"
    }

    return (
        <div onClick={holdDice} style={styles} className="h-[64px] w-[64px] flex items-center justify-center m-4 duration-200 rounded-xl cursor-pointer">
            <p className="text-xl">{value}</p>
        </div>
    )
}

export default Die