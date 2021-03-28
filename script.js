let page,countRows;
let table = document.querySelector(".table");
// function to get & manage data
async function getData(page,countRows){
    const url = `https://api.instantwebtools.net/v1/passenger?page=${page}&size=${countRows}`;
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
    let checkFirstPage = page;
    // Pagination working
    let pagiBtn = document.getElementsByClassName("pagiBtn");
    for(let e=0;e<pagiBtn.length;e++){
        pagiBtn[e].addEventListener("click", () => {
            if(e == 0){
                if(checkFirstPage == 1){
                    console.log("You'r already on first page");
                    pagiBtn[e].setAttribute("disabled","true");
                }else{
                    var deleteDynamicData = document.getElementsByClassName("dynamicData");
                    for(var g=0;g<deleteDynamicData.length;g++){
                        deleteDynamicData[g].innerHTML = "";
                    }
                    getData(1,20);
                }
            }
            if(e == 1){
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
            }
            if(e == 6){
                if(checkFirstPage == 247){
                    console.log("You'r already on Last page");
                    pagiBtn[e].setAttribute("disabled","true");
                }else{
                    var deleteDynamicData = document.getElementsByClassName("dynamicData");
                    for(var g=0;g<deleteDynamicData.length;g++){
                        deleteDynamicData[g].innerHTML = "";
                    }
                    getData(247,19);
                }
            }
        });
    }
}
getData(1,20);
