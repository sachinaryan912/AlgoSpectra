import React, { useEffect, useRef, useState } from "react";
import "../../styles/Home.css";
import FeatureCard from "../Card/FeatureCard";
import DataCarousel from "../carousel/DataCarousel";
import { featureData, dataItems } from "../../data/cardData";
import HomeNav from "../navbar/HomeNav";
import SearchBarComponent from "./SearchBarComponent";
import { useNavigate } from "react-router-dom";

const Home = () => {
    const videoRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [selectSearch,setSelectSearch] = useState("");
    const navigate = useNavigate();

    const handleSearch = () => {
        console.log(selectSearch);
        navigate(selectSearch?.path);
        
    }

    const togglePlayback = () => {
        if (!videoRef.current) return;

        if (videoRef.current.paused) {
        videoRef.current.play();
        setIsPlaying(true);
        } else {
        videoRef.current.pause();
        setIsPlaying(false);
        }
    };

    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.play().catch((error) => {
                console.error("Autoplay failed:", error);
            });
        }
    }, []);

   
      
    return (
        <div className="homepage">
            {/* Hero Section */}
            <HomeNav title="" />
            <section className="hero-section">
                <video
                    className="background-video"
                    autoPlay
                    loop
                    muted
                    playsInline
                    ref={videoRef}
                >
                    <source src="/obj_bg.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
                <div className="video-control">
                    <button className="video-toggle-button" onClick={togglePlayback}>
                    {isPlaying ? '⏸' : '▶'}
                    </button>
                </div>
                <div className="hero-content">
                    <h1 className="hero-title">AlgoSpectra</h1>
                    <p className="hero-slogan">Visualizing Data Structures & Algorithms in a Futuristic Way.</p>
                
                    <div className="hero-input">
                        <SearchBarComponent setSelectSearch={setSelectSearch}/>
                        <button className="search-button" onClick={handleSearch}>Search</button>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="features">
                <h2>Features</h2>
                <p>Explore our unique features that make learning algorithms fun and engaging.</p>
                <div className="feature-cards">
                    {featureData.map((feature, index) => (
                        <FeatureCard
                            key={index}
                            name={feature.name}
                            description={feature.description}
                            image_name={feature.image_name}
                        />
                    ))}
                </div>
            </section>

            {/* All Data Structures and Algorithms Section */}
                        <section className="all-dsa-section">
                            <div className="section-divider"></div>
                            <div className="section-header">
                                <h2>All Visualizers</h2>
                                <p>Click explore button to use all the visualizer features</p>
                                <button 
                                    className="explore-button" 
                                    onClick={() => navigate('/algoSpectra/dashboard')}
                                >
                                    Explore Now <span className="arrow">→</span>
                                </button>
                            </div>
                                
                            
                        </section>

                       <div className="crousel-bg">
                       <DataCarousel items={dataItems} />
                       
                       </div>

                        {/* New Columns Section */}
            <section className="columns-section">
                <h3>Our Services</h3><br/>
                <div className="columns-container">
                    <div className="column">
                        <h4>Data</h4>
                        <ul>
                            <li>JSON Visualizer</li>
                            <li>XML Visualizer</li>
                            <li>YAML Visualizer</li>
                        </ul>
                    </div>
                    <div className="column">
                        <h4>Data Structures</h4>
                        <ul>
                            <li>Stack</li>
                            <li>Queue</li>
                            <li>Array</li>
                            <li>Linkedlist</li>
                        </ul>
                    </div>
                    <div className="column">
                        <h4>Algorithms</h4>
                        <ul>
                        <li>Infix Postfix</li>
                        <li>Sorting</li>
                        <li>Searching</li>
                            <li>Graph</li>
                            <li>Dynamic Programming</li>
                        </ul>
                    </div>
                </div>
            </section>

            {/* Footer Section */}
            <footer className="footer">
                <div className="footer-content">
                    <p>© 2025 AlgoSpectra. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
};

export default Home;