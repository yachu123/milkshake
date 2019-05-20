<template>
    <div v-if="milkshake" class="editpage container">
        <h2>Edit {{milkshake.title}} recipe </h2> 
        <form @submit.prevent="editrecipe">
            <div class="field title">
                <label for="title">Recipe Name:</label>
                <input type="text" name="title" v-model="milkshake.title">
            </div>
            <div class="field" v-for="(ing,index) in milkshake.ingredients" :key="index">
                <label for="ingredient">Ingredient :</label>
                <input type="text" name="ingredient" v-model="milkshake.ingredients[index]">
                <i class="material-icons delete" @click="deleteing(ing)">delete</i>
            </div>
            <div class="field add-ingredient">
                <label for="add-ingredient">Add an ingredient:</label>
                <input type="text" name="add-ingredient" @keydown.enter.prevent="addIng" v-model="another">
            </div>
            <div class="field center-align">
                <p v-if="feedback" class="red-text">{{feedback}}</p>
                <button class="btn indigo">Update</button>
            </div>    
        </form>
    </div>
</template>

<script>
import db from '@/firebase/init'
import slugify from 'slugify'
export default {
    name: 'Edit',
    data(){
        return{
            milkshake: null,
            another: null,
            feedback: null,
        }
    },
    methods: {
        editrecipe(){
            if(this.milkshake.title){
                this.feedback = null 
                this.milkshake.slug = slugify(this.milkshake.title,{
                    replacement: '-',
                    remove:/[$*_+~()'"!\-:@]/g,
                    lower: true
                })
                db.collection('milkshake').doc(this.milkshake.id).update({
                
                    title: this.milkshake.title,
                    ingredients: this.milkshake.ingredients,
                    slug: this.milkshake.slug
                }).then(() => {
                    this.$router.push({name: 'Index'})
                }).catch(err=>{
                    console.log(err)
                })
            }else{
                this.feedback = "Please named your new recipe"
            }
           
        },
        addIng(){
            if(this.another){
                this.milkshake.ingredients.push(this.another)
                this.another = null
                this.feedback = null
            }else{
                this.feedback = "You must enter a value to add an ingredient "
            }

        },
        deleteing(ing){
            this.milkshake.ingredients = this.milkshake.ingredients.filter(ingredient=>{
                return ingredient != ing
            })

        }
    },
    created(){
        let ref = db.collection('milkshake').where('slug','==',this.$route.params.milkshake_slug)
        ref.get().then(snapshot => {
            snapshot.forEach(doc => {
                this.milkshake = doc.data()
                this.milkshake.id = doc.id
            });
        })
    },
}
</script>

<style>
.editpage{
    margin-top: 50px;
    padding: 20px;
    max-width: 500px;
}
.editpage h2{
    font-size: 2em;
    margin: 20px auto;
}
.editpage .field{
    margin: 20px auto;
    position: relative;
}
.editpage .delete{
    position: absolute;
    right: 0;
    bottom: 16px;
    color: #aaa;
    font-size: 1.3em;
    cursor: pointer;
}
</style>


