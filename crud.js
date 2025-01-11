// attiputes
let price=document.getElementById('price_input')
let Taxcis=document.getElementById('Taxcis_input')
let ads=document.getElementById('ads_input')
let discound=document.getElementById('discound_input')
let count=document.getElementById('count_input')
let catgoorey=document.getElementById('catgoorey_input')
let search=document.getElementById('search_input')
let titele=document.getElementById('name_input')
let create=document.getElementById('create')
let total=document.querySelector('.total')
let amounts=document.querySelector('.amounts')
let data_body=document.querySelector('.data_body')
let tmp
// get all totall
function gettotale(){
if(price.value =='' && ads.value =='' || Taxcis.value ==''){
    total.style.background='red'
}else{
  let  totales=( +price.value +  +ads.value + +Taxcis.value) - +discound.value
  amounts.innerHTML=totales
     total.style.background='green'
}
}
let allproducts = localStorage.getItem('allproduct') !== null ? JSON.parse(localStorage.getItem('allproduct')) : [];
// create new product
create.addEventListener('click',Cretates)
 function Cretates(){
    let product={
        titele:titele.value,
        price:price.value,
        Taxcis:Taxcis.value,
        ads:ads.value,
        discound:discound.value,
        total:amounts.innerHTML,
        catgoorey:catgoorey.value,
        discound:discound.value,
        count:count.value,
    }
     if(create.innerHTML==='create'){
      if(catgoorey.value!=='' && discound.value!=='' && titele.value!==''){
        if(product.count>1){
          for (let index = 0; index < product.count; index++) {
            allproducts.push(product)
            localStorage.setItem('allproduct',JSON.stringify(allproducts))
            showdata()
           cleardata()
          }
        }else{
          allproducts.push(product)
          localStorage.setItem('allproduct',JSON.stringify(allproducts))
          showdata()
         cleardata()
        }
       }
       else{
        alert('notfound')
       }
     }
     else{
      allproducts[tmp]=product
      count.style.display='block'
    create.innerHTML='create'
    create.style.background='blueviolet'
    gettotale()
    showdata()
    cleardata()
    localStorage.setItem('allproduct',JSON.stringify(allproducts))
  }
  }
// cleare value in  inpute 
  function cleardata(){
    catgoorey.value=''
    discound.value=''
    titele.value=''
    price.value=''
    Taxcis.value=''
    ads.value=''
    count.value=''
    amounts.innerHTML=''
    total.style.background='red'
  }
  // show data is tables
  function showdata(){
    if(allproducts.length!==0){
      document.getElementById('deletALL').innerHTML=`
                <button  onclick='delet_all()'>clear_all</button>
       `
     let labe=''
     for (let index=0;index <  allproducts.length ; index++) {
      labe +=`
        <tr>
                       <td>${index}</td>
                       <td>${allproducts[index].titele}</td>
                       <td>${allproducts[index].price}</td>
                       <td>${allproducts[index].Taxcis}</td>
                       <td>${allproducts[index].ads}</td>
                       <td>${allproducts[index].discound}</td>
                       <td>${allproducts[index].total}</td>
                       <td>${allproducts[index].catgoorey}</td>
                       <td><button   onclick='update(${index})'>update</button></td>
                       <td><button  onclick='delet_item(${index})'>delet</button></td>
                   </tr>
       `
       data_body.innerHTML=labe
     
     }
    }
    else{
     data_body.innerHTML=''
     document.getElementById('deletALL').innerHTML=''
    }
      
  }
  showdata()
  // delet item is tabels
  function delet_item(id){
   allproducts.splice(id,1)
   localStorage.setItem('allproduct',JSON.stringify(allproducts))
   showdata()
  }
  // clear all items is table
  function delet_all(){
     localStorage.clear()
     allproducts=[]
     showdata()
  }
  //  update item is table
  function update(i){
    console.log(allproducts[i]);
    catgoorey.value=allproducts[i].catgoorey
    discound.value=allproducts[i].discound
    titele.value=allproducts[i].titele
    price.value=allproducts[i].price
    Taxcis.value=allproducts[i].Taxcis
    ads.value=allproducts[i].ads
    count.style.display='none'
    create.innerHTML='update'
    create.style.background='green'
    amounts.innerHTML=allproducts[i].total
    total.style.background='green'
    tmp=i
    scroll({
      top:2,
      behavior:"smooth"
    })
  }
  let searchmode='titel'
  // search focuse
  function search_focus(id){
    if(id==='titele_search'){
      searchmode='titel'
      search.placeholder='search by titel '
    }else{
      searchmode='catgoorey'
      search.placeholder='search by catgoorey '
    }
    search.style.border='1px solid red'
    setTimeout(() => {
      search.style.border='none'
    }, 1000);
        search.focus()
      search.value=''
      showdata()
  }
//  search data
  function search_data(value){
    let labe=''
    for (let index = 0; index < allproducts.length; index++) {
      if(searchmode==='titel'){
          if(allproducts[index].titele.includes(value)){
              console.log(index);
              labe +=`
              <tr>
                             <td>${index}</td>
                             <td>${allproducts[index].titele}</td>
                             <td>${allproducts[index].price}</td>
                             <td>${allproducts[index].Taxcis}</td>
                             <td>${allproducts[index].ads}</td>
                             <td>${allproducts[index].discound}</td>
                             <td>${allproducts[index].total}</td>
                             <td>${allproducts[index].catgoorey}</td>
                             <td><button   onclick='update(${index})'>update</button></td>
                             <td><button  onclick='delet_item(${index})'>delet</button></td>
                         </tr>
             `
             data_body.innerHTML=labe
        }
            }
           else{
              if(allproducts[index].catgoorey.includes(value)){
               labe +=`
               <tr>
                           <td>${index}</td>
                           <td>${allproducts[index].titele}</td>
                           <td>${allproducts[index].price}</td>
                           <td>${allproducts[index].Taxcis}</td>
                           <td>${allproducts[index].ads}</td>
                           <td>${allproducts[index].discound}</td>
                           <td>${allproducts[index].total}</td>
                           <td>${allproducts[index].catgoorey}</td>
                           <td><button   onclick='update(${index})'>update</button></td>
                           <td><button  onclick='delet_item(${index})'>delet</button></td>
                        </tr>
              `
               data_body.innerHTML=labe
          }
        
        }
      }
      
  }