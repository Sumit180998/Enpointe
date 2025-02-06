import React from 'react'

function Hcom({chidren}) {
  return (
    <div style={{color:'red',size:'20pc', height:'100px',width:'100px'}}>{chidren}</div>
  )
}

export default Hcom

// const a=["apple",'mango','apple','organe'];
// output array=[{label:'apple',count:2}]
// function su(a){
//     let p=[]
//     for(let i=0;i<a.length;i++){
//         let count=0
        
//         for(let j=0;j<a.length;j++){
//             if(a[i]===a[j]){
//                 count=count+1
                
//             }
//         }
//         p.push({label:a[i],count:count})
//         count=0
//     }
//     console.log(p)
// }
// su(a)
// function filt(b){
//   const c=a.filter((item, index)=>item===b)  
//   console.log(c)
// }
// filt('apple')
// const c=a.filter((item, index)=>a.indexOf(item)!==index)
// console.log(c)