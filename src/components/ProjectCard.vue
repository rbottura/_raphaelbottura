<template>
    <!-- <v-skeleton-loader type="card"> -->
    <v-card :class="cardClass" class="rounded-lg" elevation="4" width="100px" :style="cardStyle">

        <v-card-title class="vcard-item">
            <v-badge dot :color="getBadgeColor(project)" inline>
                <div class="title-text-wrapper">
                    {{ project.title }}
                </div>
            </v-badge>
        </v-card-title>

        <div class="card-core-items">
            <v-card-item class="tags-wrapper vcard-item">
                <v-chip v-for="(tag, index) in project.tags" :key="index" class="tags-class" variant="elevated"
                    size="small">
                    {{ tag }}
                </v-chip>
            </v-card-item>

            <v-card-subtitle>
            </v-card-subtitle>

            <v-card-text class="vcard-item">
                <v-tabs-window v-model="tab" class="fixed-tab-window">
                    <v-tabs-window-item value="one" class="description-tab-container">
                        <p class="description-class">
                            {{ project.description }}
                        </p>
                        <v-card-actions class="links-wrapper">
                            <v-btn class="small-btn card-link-btn" rounded="0" variant="elevated" flat
                                v-if="project.link" :href="project.link" target="_blank" append-icon="mdi-open-in-new">
                                visit live app
                            </v-btn>
                            <v-btn class="small-btn card-link-btn" rounded="0" variant="elevated" flat
                                v-if="project.repo" :href="project.repo" target="_blank" append-icon="mdi-open-in-new">
                                Go to public Repo
                            </v-btn>
                            <v-btn class="small-btn card-link-btn" rounded="0" variant="elevated" flat
                                v-if="project.video" :href="project.video" target="_blank"
                                append-icon="mdi-open-in-new">
                                Watch video
                            </v-btn>
                        </v-card-actions>
                    </v-tabs-window-item>

                    <v-tabs-window-item class="images-tab-container" value="two">
                        <v-carousel hide-delimiters height="308px">
                            <template v-slot:prev="{ props }">
                                <v-btn size="x-small" @click="props.onClick"
                                    class="mdi mdi-chevron-left carou-btn"></v-btn>
                            </template>

                            <template v-slot:next="{ props }">
                                <v-btn size="x-small" @click="props.onClick"
                                    class="mdi mdi-chevron-right carou-btn"></v-btn>
                            </template>

                            <v-carousel-item v-for="(image, index) in project.images" :key="index"
                                :src="`/medias/${project.title}/${image}`" cover
                                @click="openImage(`${project.title}/${image}`)">
                            </v-carousel-item>
                        </v-carousel>
                    </v-tabs-window-item>
                </v-tabs-window>
            </v-card-text>

            <v-tabs class="vcard-item" color="customBlue" v-model="tab" align-tabs="center" density="compact">
                <v-tab class="small-btn" value="one">Description</v-tab>
                <v-tab class="small-btn" value="two">Images</v-tab>
            </v-tabs>

            <!-- Image Overlay -->
            <v-overlay v-model="dialog" close-on-content-click class="d-flex align-center justify-center">
                <img :src="`/medias/${selectedImage}`" class="overlay-card"></img>
            </v-overlay>

        </div>
        <v-card-item id="card-img-overlay" :style="relativeCardImage">

        </v-card-item>
    </v-card>
    <!-- </v-skeleton-loader> -->
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
                return 'rgba(3,180,255,1)';
            }

            // Active projects (no end date or future end date, and already started)
            if (startDate <= today) {
                return 'rgba(0,200,0,1)';
            }
        }
    },
    computed: {
        cardTexture() {
            if (this.project.type === 'creative') {
                // return './assets/img/shiny2_100_noise.png'; // Default image for creative projects
                return './assets/img/shiny2_20_noise.png'; // Default image for creative projects
            } else if (this.project.type === 'it') {
                return './assets/img/it_prism.png'; // Default image for IT projects
            }
            return this.project.images?.[0] || '/medias/default-placeholder.jpg'; // Fallback image
        },
        cardClass() {
            return {
                'creative-project': this.project.type === 'creative',
                'it-project': this.project.type === 'it',
            };
        },
        cardStyle() {
            // Example: Using cardIndex to choose a relative image (e.g. card1-bck-img.png)
            // Adjust the path as needed based on your assets structure.
            // const relativeImage = `./medias/${this.project.title}/bg-img.png`

            return {
                /* Note: The first URL is drawn on top. Order them as needed. */
                // backgroundImage: `url(${this.cardTexture})`,
                // backgroundImage: `url(${this.cardTexture}), url(${relativeImage})`,
                // backgroundBlendMode: 'darken',
                backgroundSize: '100%',
                backgroundPosition: 'top left',
                backgroundRepeat: 'repeat',
                // borderImage: `url(${relativeImage})`
            };
        },
        relativeCardImage() {
            const relativeImage = `./medias/${this.project.title}/bg-img.png`
            return {
                backgroundImage: `url(${relativeImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            };
        }
    }
}
</script>

<style scoped>
.v-card {
    display: block;
    /* border: rgb(103, 103, 103) 2px solid; */
    aspect-ratio: 2/3;
}

#card-img-overlay {
    display: block;
    pointer-events: none;
    position: absolute;
    z-index: -1;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
    opacity: 1;
    filter: grayscale(0) contrast(1.4) saturate(1);
    border-top-left-radius: 25px;
    border-top-right-radius: 25px;
    /* padding: -5px; */
}

#card-img-overlay:hover {
    filter: blur(5px) saturate(1.4);
}

.v-card-title {
    padding: 0px;
    font-size: 14px;
    font-weight: 700;
    line-height: 0px;

    background-color: rgb(41, 41, 41);
    color: white;
    text-overflow: ellipsis;
}

.title-text-wrapper {
    width: 80px;
    display: block;
    white-space: nowrap;
    text-overflow: ellipsis;
    text-transform: uppercase;
    overflow: hidden;
}

.description-class {
    font-family: roboto;
    font-size: 22px;
    font-weight: 800;
    line-height: normal;
    margin: 10px 5px;
    border-radius: 5px;
    opacity: 1;
}

.card-core-items {
    display: none;
}

.vcard-item {
    border-radius: 2px;
    box-sizing: border-box;
}

.vcard-item:not(:nth-child(2)) {
    width: 100%;
}

.v-chip {
    margin: 2px;
    opacity: .7;
    font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
    /* font-size: 16px; */
    font-weight: bold;
    text-transform: uppercase;
    height: 80% !important;
}

.tags-wrapper {
    height: 57px;
    padding: 2px;
}

.tags-wrapper * {
    align-self: flex-start;
}

.fixed-tab-window {
    overflow: hidden;
}

.fixed-tab-window p {
    padding: 8px !important;
}

.fixed-tab-window *:not(p, a) {
    padding: 0 !important;
}

.v-card-text {
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

.v-tabs {
    /* bottom: 8px; */
    position: absolute;
    width: calc(100% - 16px);
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

.links-wrapper {
    display: flex;
    position: absolute;
    flex-direction: row;
    flex-wrap: wrap;
    bottom: 8px;
}
</style>
<style>
</style>