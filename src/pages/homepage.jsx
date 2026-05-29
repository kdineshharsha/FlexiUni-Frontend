import FeaturedJobs from "../components/featuredJob";
import Hero from "../components/hero";
import SearchBar from "../components/searchBar";

export default function HomePage() {
    return (
        <>
            <Hero />
            <SearchBar />
            <FeaturedJobs />
        </>
    )
}
