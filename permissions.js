let numberOfModules = document.querySelectorAll('div.permission_block').length

let counter = {
    decimal: 0,
    binary: pad(0, numberOfModules)
}

class Module {
    constructor(id){
        this.id = id;
        this.selected = false;
        this.value = Math.pow(2, this.id - 1);
    }
}

let modules = []
for (let i = 1; i <= numberOfModules; i++)
{
    modules.push(
        new Module(i)
    )
}

function toggleModule(moduleId) {
    for (let module of modules) {
        if (parseInt(module.id) == parseInt(moduleId.replace("module_","")))
        {
            let element = document.getElementById(moduleId);
            element.classList.toggle("selected");
            if (element.classList.contains('selected'))
            {
                counter.decimal += parseInt(module.value);
                counter.binary = pad(counter.decimal.toString(2), 16);
            }
            else
            {
                counter.decimal -= parseInt(module.value);
                counter.binary = pad(counter.decimal.toString(2), 16);
            }
        }
    }
    updateCounter();
}

function updateCounter(){
    document.getElementById('decimal_counter').innerText = counter.decimal;
    document.getElementById('binary_counter').innerText = counter.binary;
}

function pad(num, size) {
    let s = "0".repeat(numberOfModules) + num;
    return s.substring(s.length-size);
}

function addOnclick(){
    const container_modules = document.querySelectorAll('div.permission_block');
    container_modules.forEach((item) => {
        item.addEventListener('click',function(e){
            toggleModule(item.id);
    });
    });

}

updateCounter();

