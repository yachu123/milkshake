<template>
    <div class="addrecipe container">
        <h2 class="center-align indigo-text"> New Recipe</h2>
        <form @submit.prevent="Addrecipe">
            <div class="field title">
                <label for="title">New Recipe Name:</label>
                <input type="text" name="title" v-model="title">
            </div>
            <div class="field" v-for="(ing,index) in ingredients" :key="index">
                <label for="ingredient">Ingredient :</label>
                <input type="text" name="ingredient" v-model="ingredients[index]">
                <i class="material-icons delete" @click="deleteing(ing)">delete</i>
            </div>
            <div class="field add-ingredient">
                <label for="add-ingredient">Add an ingredient:</label>
                <input type="text" name="add-ingredient" @keydown.enter.prevent="addIng" v-model="another">
            </div>
            <div class="field center-align">
                <p v-if="feedback" class="red-text">{{feedback}}</p>
                <button class="btn indigo">Add</button>
            </div>    
        </form>
    </div>
</template>

<script>
import db from '@/firebase/init'
import slugify from 'slugify'
export default {
    name: 'Add',
    data(){
        return{
            title: null,
            another: null,
            ingredients: [],
            feedback: null,
            slug: null
        }
    },
    methods: {
        Addrecipe(){
            if(this.title){
                this.feedback = null 
                this.slug = slugify(this.title,{
                    replacement: '-',
                    remove:/[$*_+~()'"!\-:@]/g,
                    lower: true
                })
                db.collection('milkshake').add({
                
                    title: this.title,
                    ingredients: this.ingredients,
                    slug: this.slug
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
                this.ingredients.push(this.another)
                this.another = null
                this.feedback = null
            }else{
                this.feedback = "You must enter a value to add an ingredient "
            }

        },
        deleteing(ing){
            this.ingredients = this.ingredients.filter(ingredient=>{
                return ingredient != ing
            })

        }
    }
}
</script>

<style>
.addrecipe{
    margin-top: 50px;
    padding: 20px;
    max-width: 500px;
}
.addrecipe h2{
    font-size: 2em;
    margin: 20px auto;
}
.addrecipe .field{
    margin: 20px auto;
    position: relative;
}
.addrecipe .delete{
    position: absolute;
    right: 0;
    bottom: 16px;
    color: #aaa;
    font-size: 1.3em;
    cursor: pointer;
}
</style>


