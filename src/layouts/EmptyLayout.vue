<template>
    <div class="empty-layout">
        <Container>
            <Grid>
                <div><p></p></div>
                <div>
                    <Card>
                        <router-view />
                    </Card>
                </div>
                <div><p></p></div>
            </Grid>
        </Container>
    </div>
</template>

<script>
import Card from '../components/html/Card.vue'
import Container from '../components/html/Container.vue'
import Grid from '../components/html/Grid.vue'
import messadges from '../function/messadges'
export default {
    components: { Container, Grid, Card },

    computed: {
        error() {
            return this.$store.getters.error
        },
    },
    watch: {
        error(fbError) {
            this.$store.dispatch(
                'notic',
                messadges[fbError.code] || 'Что то пошло не так'
            )
        },
    },
}
</script>
<style>
.empty-layout .grid {
    height: 100vh;
    align-content: space-around;
}
</style>
