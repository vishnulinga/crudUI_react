import React, {Component} from 'react';
class App extends Component {
    constructor() {
        super()
        this.state = {
            fname: "",
            lname: "",
            email: "",
            resarray: []
        }

        this.change = this.change.bind(this)
    }
    change(event) {
        this.setState({[event.target.name]: event.target.value})
    }
    insert = async () => {
        if (this.state.fname === "" || this.state.lname === "" || this.state.email === "") 
            alert("Please enter all details")
         else {
            try {
                var res = await fetch("http://localhost:3020/insert", {
                    method: "POST",
                    body: JSON.stringify(
                        {fname: this.state.fname, lname: this.state.lname, email: this.state.email}
                    ),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                var result = await res.json()
                console.log(result)
                alert(result.message)
            } catch (err) {
                console.log(err)
            }
        }

    }
    // ..................................................
    update = async () => {
        if (this.state.fname === "" || this.state.lname === "" || this.state.email === "") 
            alert("Please enter all details")
         else {
            try {
                var res = await fetch("http://localhost:3020/update", {
                    method: "POST",
                    body: JSON.stringify(
                        {fname: this.state.fname, lname: this.state.lname, email: this.state.email}
                    ),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                var result = await res.json()

                alert(result.message)
            } catch (err) {
                console.log(err)
            }
        }

    }
    // .........................................
    delete = async () => {
        if (this.state.email === "") 
            alert("Please enter email")
         else {
            try {
                var res = await fetch("http://localhost:3020/delete", {
                    method: "POST",
                    body: JSON.stringify(
                        {email: this.state.email}
                    ),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                var result = await res.json()
                alert(result.message)
            } catch (err) {
                console.log(err)
            }
        }

    }
    // ................................................


    display = async () => {

        try {
            var res = await fetch("http://localhost:3020/display")
            var result = await res.json()
            this.setState({resarray: result})
        } catch (err) {
            console.log(err)
        }

    }


    render() {
        return (
            <div style={
                {
                    marginLeft: "auto",
                    marginRight: "auto",
                    textAlign: "center"
                }
            }>
                <h1>CRUD Operations Demo On User Data</h1>
                <div><input type={"text"}
                        style={
                            {
                                width: "300px",
                                height: "30px",
                                marginTop: "5px",
                                marginBottom: "5px"
                            }
                        }
                        name={"fname"}
                        placeholder={"First Name"}
                        onChange={
                            this.change
                        }/></div>
                <div><input type={"text"}
                        style={
                            {
                                width: "300px",
                                height: "30px",
                                marginTop: "5px",
                                marginBottom: "5px"
                            }
                        }
                        name={"lname"}
                        placeholder={"Last Name"}
                        onChange={
                            this.change
                        }/></div>
                <div><input type={"text"}
                        style={
                            {
                                width: "300px",
                                height: "30px",
                                marginTop: "5px",
                                marginBottom: "5px"
                            }
                        }
                        name={"email"}
                        placeholder={"Email"}
                        onChange={
                            this.change
                        }/></div>
                <button onClick={
                    this.insert
                }>
                    {"Insert"}</button>
                <button onClick={
                    this.update
                }>
                    {"Update"}</button>
                <button onClick={
                    this.delete
                }>
                    {"Delete"}</button>
                <button onClick={
                    this.display
                }>
                    {"Display"}</button>
                <div style={
                    {
                        marginLeft: "auto",
                        marginRight: "auto",
                        textAlign: "center"
                    }
                }>
                    <h3 style={
                        {color: "red"}
                    }>
                        <ul>{
                            this.state.resarray.map((ele) => (
                                <li key={
                                    ele._id
                                }>FirstName::{
                                    ele.fname
                                }<br/>LastName::{
                                    ele.lname
                                }<br/>Email::{
                                    ele._id
                                }<br/></li>
                            ))
                        } </ul>
                    </h3>
                </div>
            </div>

        )
    }
}


export default App;
