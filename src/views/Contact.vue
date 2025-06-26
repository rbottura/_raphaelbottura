<template>
    <v-card class="global-card-class contact-card mx-auto rounded-lg" elevation="4" subtitle="Developper - p5js fan"
        title="Raphael Bottura">
        <template v-slot:prepend>
            <v-avatar size="64">
                <v-img alt="Raphael Bottura" src="medias/face_bw.png"></v-img>
            </v-avatar>
        </template>
        <v-card-text>
            <v-list density="compact">
                <v-list-item v-for="(item, i) in items" :key="i" :value="i" :title="`${item.name}`"
                    :subtitle="`${item.date}`" color="primary">
                </v-list-item>
            </v-list>
            <v-btn size="small" variant="outlined" prepend-icon="mdi mdi-instagram"
                href="https://www.instagram.com/_rbottura/" target="_blank">_rbottura</v-btn>
            <v-btn size="small" variant="outlined" prepend-icon="mdi mdi-github" href="https://github.com/rbottura"
                target="_blank">rbottura</v-btn>
            <v-btn size="small" variant="outlined" prepend-icon="mdi mdi-linkedin"
                href="https://www.linkedin.com/in/raphael-bottura-a96725198/" target="_blank">linkedin</v-btn>
        </v-card-text>
    </v-card>
</template>
<script>
export default {
    data() {
        return {
            items: [
                {
                    name: 'Born in Calais, France.',
                    date: 1997,
                    id: 1,
                },
                {
                    name: 'DNSEP in Valence, France.',
                    date: 2023,
                    id: 2,
                },
                {
                    name: 'bottura.raphael@gmail.com',
                    date: "",
                    id: 3,
                },
            ]
        }
    }
}
</script>
<style>
.contact-card {
    margin: 4em 25px;
    border: double grey 4px;
}
</style>