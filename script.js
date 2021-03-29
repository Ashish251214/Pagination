let page,countRows,checkFirstPage;
let table = document.querySelector(".table");
// function to get & manage data
async function getData(page,countRows){
    const url = `https://api.instantwebtools.net/v1/passenger?page=${page}&size=${countRows}`;
    checkFirstPage = page;
    await fetch(url).then(res =>{
        return res.json();
    }).then(data =>{
        let mainData = data.data;
        let rows;
        let valueArray = [];
        function isObject(val){
            if(val === null){
                return false;
            }
            return (typeof val === 'object');
        }
        let checkStatus = 0;
        for(let i=0;i<mainData.length;i++){
            if(i==checkStatus){
                const objprops = function(obj) {
                    for(let val in obj){
                        if(isObject(obj[val])){
                            objprops(obj[val]);
                        }else{
                            valueArray.push(obj[val]);
                        }
                    }
                }
                objprops(mainData[i]);
                rows = "<tr class='dynamicData' >";
                rows += `<td>${i+1}</td>`;
                for(let count=0;count<valueArray.length;count++){
                    rows += `<td>${valueArray[count]}</td>`;
                }
                rows += "</tr>";
                table.innerHTML += rows;
                checkStatus = checkStatus+1;
                valueArray.splice(0,valueArray.length);
            }
        }
    }).catch(err =>{
        throw("Error: ",err);
    });
}
getData(1,20);
// pagination working of all button
    // Pagination working
    let firstBtn = document.querySelector("#firstBtn");
    let previousBtn = document.querySelector("#previousBtn");
    let numberBtn = document.getElementsByClassName("numberBtn");
    let nextBtn = document.querySelector("#nextBtn");
    let lastBtn = document.querySelector("#lastBtn");
    // first Button
    firstBtn.addEventListener('click', () => {
        if(checkFirstPage == 1){
            console.log("You'r already on first page");
            firstBtn.setAttribute("disabled","true");
        }else{
            var deleteDynamicData = document.getElementsByClassName("dynamicData");
            for(var g=0;g<deleteDynamicData.length;g++){
                deleteDynamicData[g].innerHTML = "";
            }
            getData(1,20);
        }
    });
    // previousBtn 
    previousBtn.addEventListener("click", () => {
        if(checkFirstPage == 1){
            console.log("You'r already on first page");
        }else{
            var deleteDynamicData = document.getElementsByClassName("dynamicData");
            for(var g=0;g<deleteDynamicData.length;g++){
                deleteDynamicData[g].innerHTML = "";
            }
            let prevBtn = checkFirstPage-1;
            getData(`${prevBtn}`,20);
        }
    });
    // nextBtn
    nextBtn.addEventListener("click", () => {
        if(checkFirstPage == 247){
            console.log("You'r already on last page");
        }else{
            console.log(checkFirstPage);
            var deleteDynamicData = document.getElementsByClassName("dynamicData");
            for(var g=0;g<deleteDynamicData.length;g++){
                deleteDynamicData[g].innerHTML = "";
            }
            let prevBtn = parseInt(checkFirstPage) + parseInt(1);
            console.log(prevBtn , "Increment");
            if(checkFirstPage == 246){
                getData(`${prevBtn}`,19);
            }else{
                getData(`${prevBtn}`,20);
            }
        }
    });
    // lastBtn
    lastBtn.addEventListener("click",() => {
        if(checkFirstPage == 247){
            console.log("You'r already on Last page");
            lastBtn.setAttribute("disabled","true");
        }else{
            var deleteDynamicData = document.getElementsByClassName("dynamicData");
            for(var g=0;g<deleteDynamicData.length;g++){
                deleteDynamicData[g].innerHTML = "";
            }
            getData(247,19);
        }
    });