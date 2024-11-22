"use client"
// import { useState } from "react";

const LikePage = () => {
// const [name, setName] = useState("Hoi Dan IT")

    const handleClick = () => {
        alert("me")
    }
    return (
        <div onClick={() => handleClick()}>
            like apge
        </div>
    )
}
export default LikePage;