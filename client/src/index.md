body {
    margin: 0;
    padding: 0;
    font-family: Raleway, sans-serif;
    background-color: #FBEEE7;
    position: relative;
}

h1 {
    margin: 0;
}

/*NAVBAR*/
.navbar {
    background-color: #FBEEE7;
    font-weight: 1.25rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-shadow: #94618E 0px 0px 10px;
}

.navbar-text {
    color: #49274A;
    padding-left: 10px;
    font-family: Raleway, sans-serif;
    font-size: 1.25rem;
    font-weight: 1.25rem;
    margin-left: 5rem;
}

/*HOME PAGE*/
.home {
    display: flex;
    flex-direction: column;
    background-color: #F4DECB;
    height: 100vh;
    justify-content: center;
    position: relative;
}

.home-btns {
    display: flex;
    position: absolute bottom 10px;
    width: 100%;
    justify-content: space-around;
}
/*HOME PAGE TEXT*/
.welcome {
    margin-left: 0;
    padding-left:0;
    margin-bottom: 5rem;
    color: #49274A;
    font-size: 3rem;
    font-weight: 4rem;
    font-family: Raleway, sans-serif;
}

/*REGISTER AND LOGIN*/
.auth{
    display: flex;
    background-color: aqua;
    height: 100vh;
    align-items: center;
    justify-content: center;
    display: flex;
}

.auth >form {
    margin: auto;
    min-height: 70%;
    width: 40%;
    padding: 2rem;
    /*border-radius: 0.4rem;*/
    background-color: aliceblue;
    box-shadow: 0 0 0.5rem grey;
}

.auth form h1 {
    margin-bottom: 2rem;
}

.auth form div {
    margin: auto;
    padding: 0.7rem;
    display: flex;
    flex-direction: column;
}

form .button {
    margin: auto;
    background-color: blue;
    border: none;
    border-radius: 0.2rem;
    color: white;
    font-weight: 2rem;
    padding: 10px;
    cursor: pointer;
    width: 100%;
}

input {
    border: none;
    background: none;
    border-bottom: 1px solid #ccc;
    padding: 5px;
    outline: none;
    font-size: 16px;
    font-family: Arial, sans-serif;
    transition: border-bottom-color 0.3s ease; 
     
}

/*ALL CLIENT PAGEs*/
.client {
    background-color: #F4DECB;
}

.client h2 {
    margin: 0;
    padding-left: 3rem;
}

/*SINGLE CARD BEING MAPPED*/
.service {
    background-color: #94618E;
    color: #FBEEE7;
    display: grid;
    grid-template-columns:1fr 1fr 1fr ;
    gap: 10px;
    border: 1px solid grey;
    border-radius: 0rem;
    margin: 2rem;
    align-items: center;
}

.service img {
    width: 100%;
}

.service button {
    background-color: green;
    border: none;
    border-radius: 0.5rem;
    height: 3rem;
    width: 6rem;
    color:aliceblue;
    font-weight: 2rem;
    font-size: 1.2rem;
    margin:auto;
}

/*CONTAINER FOR THE MAPPED CARDS*/
.service-list {
    list-style: none;
    margin: auto;
    width: 70vw;
    margin-left: 5rem;
}

.side-btns {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    position: absolute;
    bottom: left 1rem bottom 10rem;
    width: 5rem;
    height: 5rem;
    background-color: white;
    padding: 10px;
}

/*CONTAINER FOR THE MAPPED CARDS IN CLIENT ORDER PAGE*/
.order-list {
    width: 80vw;
    margin: auto;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
}

.order {
    border: 1px solid grey;
    border-radius: 1rem;
    padding: 10px;
    margin: 10px;
    width: 30vw;
}

/*NOT FOUND PAGE*/
.not-found {
    display: flex;
    flex-direction: column;
    background-color:#94618E;
    height: 100vh;
    justify-content: center;
    position: relative;
}

.not-found h1 {
    margin: 0;
    padding-left:0;
    margin-bottom: 5rem;
    color: #49274A;
    font-size: 3rem;
    font-weight: 4rem;
    font-family: Raleway, sans-serif;
}

/*WORKER PAGE*/
.worker {
    background-color: #94618E;
}

/*ALL ADMIN PAGES*/
.admin {
    background-color: #F4DECB;
    width: 80vw;
    min-height: 100vh;
    margin-left: auto;
}

.admin h2 {
    margin-top: 0;
    padding: 1rem;
}

/*CONTAINER FOR THE MAPPED CARDS IN ADMIN PAGE*/
.admin-list {
    margin: auto;
    min-height: 100vh;
    display: flex;
    flex-wrap: wrap;
    gap: 0.4rem;
}

/*SINGLE CARD BEING MAPPED*/
.admin-list-item {
    border: 1px solid grey;
    background-color: #94618E;
    color: #FBEEE7;
    border-radius: 1rem;
    padding: 0.8rem;
    padding-right: 3rem;
    margin: 0.8rem;
    height: fit-content;
}

.admin-list-item:hover {
    box-shadow: #94618E 0 0 0.5rem;
}

.admin-manage-orders {
    display: flex;
    flex-direction: column;
    width: 30vw;
    margin: auto;
    padding: 10px;
    background-color: #F4DECB
}

.admin-form {
    display: flex;
    flex-direction: column;
    width: 30vw;
    margin: auto;
    padding: 10px;
    background-color: #F4DECB;

}

.admin-form div{
    display: flex;
    flex-direction: column;
    margin: 10px;
    margin-bottom: 2rem;
}

/*LOGOUT BUTTON IN NAVBAR*/
.logout-button {
    background-color: transparent;
    border: none;
    margin-right: 0.5rem;
}