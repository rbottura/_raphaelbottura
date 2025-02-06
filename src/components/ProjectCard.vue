<template>
    <v-card class="card-class rounded-lg" elevation="12" max-width="300px" :image="projectImage" height="460px">
        <v-badge dot :color="getBadgeColor(project)" inline>
            <v-card-title>{{ project.title }}</v-card-title>
        </v-badge>

        <v-card-item class="divider-wrapper">
            <v-divider></v-divider>
        </v-card-item>

        <v-card-item class="tags-wrapper">
            <v-chip v-for="(tag, index) in project.tags" :key="index" class="ma-1 tags-class" size="x-small">
                {{ tag }}
            </v-chip>
        </v-card-item>

        <v-card-subtitle>
        </v-card-subtitle>

        <v-card-text>
            <v-tabs-window v-model="tab" class="fixed-tab-window">
                <v-tabs-window-item value="one" class="description-tab-container">
                    <p class="description-class">
                        {{ project.description }}
                    </p>
                    <v-card-actions>
                        <v-btn class="small-btn" v-if="project.link" :href="project.link" target="_blank"
                            append-icon="mdi-open-in-new">
                            visit live app
                        </v-btn>
                    </v-card-actions>
                </v-tabs-window-item>

                <v-tabs-window-item class="images-tab-container" value="two">
                    <v-carousel hide-delimiters height="286px">
                        <template v-slot:prev="{ props }">
                            <v-btn size="x-small" @click="props.onClick" class="mdi mdi-chevron-left carou-btn"></v-btn>
                        </template>

                        <template v-slot:next="{ props }">
                            <v-btn size="x-small" @click="props.onClick"
                                class="mdi mdi-chevron-right carou-btn"></v-btn>
                        </template>

                        <v-carousel-item v-for="(image, index) in project.images" :key="index" :src="`/medias/${image}`"
                            cover @click="openImage(image)">
                        </v-carousel-item>
                    </v-carousel>
                </v-tabs-window-item>
            </v-tabs-window>
        </v-card-text>

        <v-tabs color="customBlue" v-model="tab" align-tabs="center" density="compact">
            <v-tab class="small-btn" value="one">Description</v-tab>
            <v-tab class="small-btn" value="two">Images</v-tab>
        </v-tabs>

        <!-- Image Overlay -->
        <v-overlay v-model="dialog" close-on-content-click class="d-flex align-center justify-center">
            <img :src="`/medias/${selectedImage}`" class="overlay-img"></img>
        </v-overlay>
    </v-card>
</template>

<script>
export default {
    props: {
        project: Object
    },
    data: () => ({
        tab: null,
        dialog: null
    }),
    methods: {
        openImage(image) {
            this.selectedImage = image;
            this.dialog = true;
        },
        getBadgeColor(project) {
            const today = new Date();
            const startDate = new Date(project.beginDate);

            const endDate = project.endDate ? new Date(project.endDate) : null;

            const elapsedT = Math.abs(Math.floor(((startDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)))) > 180
            // console.log(((startDate.getTime() - today.getTime())/(1000 * 60 * 60 * 24) > 60))

            // Sleeping projects (hasn't started yet)
            if (elapsedT && !endDate) {
                return 'grey';
            }

            // Ended projects
            if (endDate && endDate < today) {
                return 'rgba(3,180,255,.6)';
            }

            // Active projects (no end date or future end date, and already started)
            if (startDate <= today) {
                return 'rgba(0,200,0,.6)';
            }
        }
    },
    computed: {
        projectImage() {
            if (this.project.type === 'creative') {
                return './assets/img/prism_25.png'; // Default image for creative projects
            } else if (this.project.type === 'it') {
                return './assets/img/it_prism.png'; // Default image for IT projects
            }
            return this.project.images?.[0] || '/medias/default-placeholder.jpg'; // Fallback image
        }
    }
}
</script>

<style scoped>
::v-deep(.v-chip) {
    margin: 2px;
}

.card-class {
    border: solid rgba(0, 0, 0, 0.192) 2px;
}

::v-deep(.v-card-title) {
    padding: 6px 6px 2px 16px;
}

.divider-wrapper {
    padding: 2px 5px 2px 5px;
}

.tags-wrapper {
    display: block;
    height: 57px;
    padding: 2px 6px 2px 5px;
}

.fixed-tab-window {
    height: 280px;
    overflow: hidden;
}

.v-card-text {
    border: rgb(206, 206, 206, .2) 3px double;
    margin: 5px;
    border-radius: 5px;
    padding: 0 !important;
}

.v-carousel-item {
    cursor: pointer;
}

.description-tab-container {
    padding: 1rem;
}

.images-tab-container {
    border-radius: 5px;
}

.small-btn {
    font-size: 12px;
    opacity: 0.9;
}

.description-class {
    font-family: roboto;
    font-size: large;
    font-weight: light;
}

.v-tabs {
    bottom: 0px;
    position: absolute;
    width: 100%;
}

.overlay-card {
    max-width: 90vw;
    /* Ensures it never overflows the viewport width */
    max-height: 90vh;
    /* Ensures it never overflows the viewport height */
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: transparent;
    /* No unwanted background */
}

.overlay-img {
    max-width: 90%;
    max-height: 90%;
    object-fit: contain;
    /* Ensures the whole image fits */
}
</style>
<style>
.v-badge {
    width: 100%;
}

.v-badge--inline .v-badge__wrapper {
    width: 100%;
    justify-content: space-between !important;
    margin: 0px !important;
    padding: 0px 10px 0px 0px;
}
</style>