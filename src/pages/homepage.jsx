import Benefits from "../components/benefits";
import FeaturedJobs from "../components/featuredJob";
import Footer from "../components/footer";
import Hero from "../components/hero";
import HowItWorks from "../components/howItWorks";
import SearchBar from "../components/searchBar";
import { useAuth } from "../context/authContext";

export default function HomePage() {
    const { user } = useAuth();
    const isUser = user?.role === "employer" || user?.role === "admin";
    return (
        <>
            <Hero />

            {/* Employer නොවන අයට (Student සහ Guest අයට) පමණක් Search Bar එක සහ Jobs Feed එක පෙන්වීම */}
            {!isUser && (
                <>
                    <SearchBar />
                    <FeaturedJobs />
                </>
            )}

            <HowItWorks />
            <Benefits />
            <Footer />
        </>
    )
}
