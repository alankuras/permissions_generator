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

function increaseCounterByModule(module)
{
    counter.decimal += parseInt(module.value);
    counter.binary = pad(counter.decimal.toString(2), 16);
}

function decreaseCounterByModule(module)
{
    counter.decimal -= parseInt(module.value);
    counter.binary = pad(counter.decimal.toString(2), 16);
}

function toggleModule(moduleId) {
    for (let module of modules) {
        if (parseInt(module.id) == parseInt(moduleId.replace("module_","")))
        {
            let element = document.getElementById(moduleId);
            element.classList.toggle("selected");
            if (element.classList.contains('selected'))
            {
                increaseCounterByModule(module=module);
            }
            else
            {
                decreaseCounterByModule(module=module);
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
    return s.substring(s.length - size);
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


/// Calculate permissions from dec if provided in the url e.g. index.html#60535
// use ctrl+f5 for refresh
let perm = window.location.hash.replace("#","")
if (perm.length > 0)
{
    try
    {
        console.log("Permissions will be matched to the decimal value of : " + perm);
        console.log("If you provided value that exceeds the weight of permissions the maximum value will be used");

        modules.sort(
            function reverseSort(a, b)
            {
                if (parseInt(a.value) < parseInt(b.value)) { return 1; }
                if (parseInt(a.value) > parseInt(b.value)) { return -1; }
                return 0
            }
        )
        for (let module of modules)
        {
            if (perm > 0)
            {
                if (parseInt(module.value) <= parseInt(perm)){
                    perm -= parseInt(module.value);
                    increaseCounterByModule(module=module);
                    document.getElementById("module_"+module.id).classList.toggle("selected")
                }
            }
        }

        updateCounter();
    } catch (e) {
        console.log("Couldn't parse url parameters, error: " + e)
    }
}