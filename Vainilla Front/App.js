let url = "https://localhost:44380/api/Person";
const name = document.getElementById("name");
const age = document.getElementById("age");
const Id = document.getElementById("hidden");

const Delete = (id) => {
    fetch(url, {
        body: JSON.stringify({
            Id: id
        }),
        method: 'DELETE',
        headers: {
            'Accept': "application/json",
            'Content-Type': "application/json"
        }
    }).then(response => {
        if (response.ok) {
            return response.text();
        } else {
            alert('Error in executed the request')
        }
    }).then(data => {
        GetAll();
    });
};

const editForm = (id, fullName, Age) => {

    Id.value = id;
    name.value = fullName;
    age.value = Age;
};

const Put = () => {

    fetch(url, {
        body: JSON.stringify({
            Id: Id.value,
            fullName: name.value,
            age: age.value
        }),
        method: 'PUT',
        headers: {
            'Accept': "application/json",
            'Content-Type': "application/json"
        }
    }).then(response => {
        if (response.ok) {
            return response.text();
        } else {
            alert('Error in executed the request')
        }
    }).then(data => {
        GetAll();
        Id.value = '';
        name.value = '';
        age.value = '';
    });
};


const GetAll = async () => {
    const promise = await fetch(url, {
        method: "GET"
    });
    const data = await promise.json();
    //console.log(data);
    document.getElementById("containerInfo").innerHTML = "";
    const ul = document.createElement("ul");
    ul.className = "list-group";
    document.getElementById("containerInfo").appendChild(ul);

    data.forEach(element => {
        const li = document.createElement("li");
        const btnUpdate = document.createElement("button");
        const btnDelete = document.createElement("button");
        btnUpdate.innerHTML = "Update";
        btnUpdate.className = "btn btn-warning mx-2";
        btnUpdate.miId = element.id;
        btnUpdate.miName = element.fullName;
        btnUpdate.miAge = element.age;
        btnUpdate.addEventListener("click", function (e) {
            editForm(e.target.miId, e.target.miName, e.target.miAge);
        });
        btnDelete.innerHTML = "Delete";
        btnDelete.className = "btn btn-danger mx-2";
        btnDelete.miId = element.id;
        btnDelete.addEventListener("click", function (e) {
            Delete(e.target.miId);
        });
        li.className = "list-group-item";
        li.innerHTML = `${element.fullName} - ${element.age} -`;
        ul.appendChild(li);
        li.appendChild(btnUpdate);
        li.appendChild(btnDelete);
    });
};

GetAll();

document.getElementById("clear").addEventListener("click", function(e) {
    e.preventDefault();

    Id.value = '';
    name.value = '';
    age.value = '';
});

const Post = () => {
  
    fetch(url, {
        method: "POST",
        body: JSON.stringify({
            fullName: name.value,
            age: age.value
        }),
        headers: {
            'Accept': "application/json",
            'Content-Type': "application/json"
        }
    }).then(response => {
        if (response.ok) {
            return response.text();
        } else {
            alert('Error in executed the request')
        }
    }).then(data => {
        GetAll();
        name.value = '';
        age.value = '';
    });
};

document.getElementById("btn").addEventListener("click", function (e) {
    e.preventDefault();

    if (Id.value !== '') {
        Put();
    } else {
        Post();
    }
});