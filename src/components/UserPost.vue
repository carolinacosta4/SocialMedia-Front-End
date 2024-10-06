<template>
    <div id="post">
        <div id="postCover">
            <img :src="image" id="cover" />
        </div>
        <p id="date" class="inter-light font-size-10">{{ postDate }}</p>
    </div>
</template>

<script>
export default {
    props: {
        image: {
            type: String,
            required: true,
        },

        published: {
            type: String,
            required: true
        }
    },

    computed: {   
        postDate() {
            return new Date(this.published).toLocaleDateString()
        }
    },
};
</script>

<style scoped>
#post {
    border-radius: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
}

#postCover {
    display: flex;
    justify-content: center;
}

#cover {
    width: 12rem;
    height: 12rem;
    object-fit: cover;
    border-radius: 5px;
}

#date{
    margin: 0.5em 0 0 0;
}
</style>