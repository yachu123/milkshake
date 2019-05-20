<template>
    <div class="navbar">
        <nav class="nav-extended blue accent-1">
            <div class="nav-content">
                <router-link :to="{ name : 'Index'}">
                    <span class="nav-title">My Milkshake</span>
                </router-link>
                <a href="" class="btn-floating btn-large halfway-fab indigo">
                    <router-link :to="{ name : 'Add'}">
                        <i class=" material-icons">add</i>
                    </router-link>
                </a>
            </div>
        </nav>
    </div>
</template>

<script>
export default {
    name: 'Navbar',
    data(){
        return{

        }
    }
}
</script>

<style>
.navbar nav{
    padding: 0 30px;
}
</style>


