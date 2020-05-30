function change(user){
    user.name = "Tom";
}

var bob ={
    name: "Bob"
};
console.log("before change:", bob.name);    // Bob
change(bob);
console.log("after change:", bob.name);     // Tom
