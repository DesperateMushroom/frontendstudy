
let navBox = document.getElementById('navBox');
let navList = navBox.getElementsByTagName('li');

console.log(navList);

for(let i = 0; i<navList.length; i++){
    
    let item = navList[i];
    item.onclick = function(){
        let active = item.getElementsByTagName('div');
        let active1 = document.getElementsByClassName('active1');
        let active2 = document.getElementsByClassName('active2');
        active1[0].className='';
        active2[0].className='';
    
        
        // active2[0].style.display='none';
        active[0].className='active1';
        active[1].className='active2';
    }
}