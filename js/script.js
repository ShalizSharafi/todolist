const addBtn = document.querySelector('.addBtn')
const inp = document.getElementById('inp')
const taskWall = document.querySelector('.taskWall')
const date = document.querySelector('.date')
const time = document.querySelector('.time')
const _delete = document.querySelector('.delete')

const navItem = document.querySelectorAll('.navItem')
const checkinp = document.getElementById('checkinp')







///date and time//////////////////////////////////////////////////////////////////////////////////////////////////////////////_____++++++**********///////////////////////////////////////////////////////

let _date = new Date().toLocaleDateString('en')
let _time = new Date().toLocaleTimeString('en')
date.children[0].innerText = _date
time.children[0].innerText = _time

///date and time//////////////////////////////////////////////////////////////////////////////////////////////////////////////_____++++++**********///////////////////////////////////////////////////////





/// add task section //////////////////////////////////////////////////////////////////////////////////////////////////////////////_____++++++**********///////////////////////////////////////////////////////
addBtn.addEventListener('click',()=>{
       let inpVal = inp.value

       if(inpVal == ''){
              alert('fill the task')
       }else{
              taskGenerator(inpVal)
       }
})


//task generating function 
function taskGenerator(x){
       let li = document.createElement('li')
              li.classList.add('tasks')
              li.innerHTML=`
              
                           <div class="flex w-full gap-2 items-start  ">
                            <div class="w-fit flex items-start justify-center translate-y-1.5">
                                   <input type="checkbox" name="" id="checkinp" onchange="checking(this)" class="flex" >
                            </div>
                            <div class="w-fit grow flex flex-wrap content-start px-2 ">
                            <h3 class="w-full text-start taskText">
                                   ${x}
                            </h3>
                            </div>
                           </div>
                         
                            <div class="row justify-between items-center">
                     <h3 class="w-1/2 text-text-body/50 text-xs  ">${_time} - ${_date}</h3>
                      <div class="w-1/2 flex items-center justify-end gap-2.5">
                                   <i class="delete" onclick="myDelete(this)">
                                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="gray" class="size-5">
  <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
</svg>

                                   </i>
                                   <i class="edit" onclick="myEdit(this)" >
                                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="gray" class="size-5">
  <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
</svg>

                                   </i>
                            </div>
                   </div>
                     
              `
              
              taskWall.appendChild(li)
              checking(li)
              inp.value=null
              inp.focus()
}
//task generating function 







/// delete section //////////////////////////////////////////////////////////////////////////////////////////////////////////////_____++++++**********///////////////////////////////////////////////////////
let x
function myDelete(s){
       if(confirm('are you sure you want to delete the task?')){
let counter = 3

           x =  setInterval(() => {
                     if(counter > 0){
                            counter --
                            _delete.style.display='flex'
                            _delete.children[0].innerText = counter
                            _delete.children[2].setAttribute('onclick','undoFunction(this)')

                     }else{
                            setTimeout(() => {
                                   s.closest('.tasks').remove()
                            }, 100);
                           _delete.style.display='none'
                           clearInterval(x)
                     }
              }, 1000);
       }
}


function undoFunction(s){
       clearInterval(x)
        _delete.style.display='none'
}

/// delete section done //////////////////////////////////////////////////////////////////////////////////////////////////////////////_____++++++**********///////////////////////////////////////////////////////

/// filter section //////////////////////////////////////////////////////////////////////////////////////////////////////////////_____++++++**********///////////////////////////////////////////////////////
let target
navItem.forEach((val)=>{
       val.addEventListener('click',()=>{
              let temp = val.getAttribute('data-filter')
              console.log(temp)
              let tasks = document.querySelectorAll('.taskWall>li')
              console.log(tasks)
              
              tasks.forEach((item)=>{

                     item.style.display='flex'
                     if(temp == 'completed'){
                             if(item.getAttribute('data-status') != 'completed') item.style.display='none'

                     }else if(temp == 'active'){
                            if(item.getAttribute('data-status') != 'active') item.style.display='none'

                     }else{
                            item.style.display='flex'
                     }
              })
             
       })
       
})


/// checking section //////////////////////////////////////////////////////////////////////////////////////////////////////////////_____++++++**********///////////////////////////////////////////////////////


function checking(s){

       let task = s.closest('.tasks')
       let taskClone = task.querySelector('.taskText')

       console.log(taskClone)

       if(s.checked){
              task.dataset.status='completed'
              taskClone.outerHTML = `<del class="taskText w-full text-start">${taskClone.innerText}</del>`
       }else{
              task.dataset.status='active'
              let del = task.querySelector('.taskText')
              del.outerHTML=`<h3 class="taskText w-full text-start">${del.innerText}</h3>`
       }
}



///edit////


function myEdit(s){
       let clone = s.closest('.tasks').children[0].children[1].children[0].innerText
       console.log(clone)
       s.closest('.tasks').remove()
       let li = document.createElement('li')
       li.classList.add('tasks')
       li.innerHTML=`
                           <div class="flex w-full gap-2 items-start flex-wrap ">
                            <div class="w-full flex content-start gap-2.5">
                            <i class="edit" >
                                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="gray" class="size-5">
  <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
</svg>

                                   </i>
                            <input type="text" class="inpTop" id="inp" placeholder="add a new task ..." >
                            </div>
                           
                            <div class="row justify-between items-center">
                     <h3 class="w-1/2 text-text-body/50 text-xs  ">${_time} - ${_date}</h3>
                      <div class="w-1/2 flex items-center justify-end gap-2.5">
                                   <button class="saveBtn addBtn" onclick="mySave(this)">ok</button>
                            </div>
                   </div>
                   </div>
                                
       `
       li.querySelector('.inpTop').value = clone
       taskWall.appendChild(li)
}


/////saving after the edit


function mySave(s){
       let clone = s.closest('.tasks').querySelector('.inpTop').value
       s.closest('.tasks').remove()
       taskGenerator(clone)
       document.querySelector('.tasks').children[1].children[0].innerText = `edited at ${_time} - ${_date}`
}

