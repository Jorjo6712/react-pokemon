import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle
} from "@/components/ui/card"

import { MoonLoader } from "react-spinners"

import { ImFire } from "react-icons/im"
import { IoMdWater } from "react-icons/io"
import { GiHighGrass } from "react-icons/gi"
import { MdElectricBolt } from "react-icons/md"
import { IoBug } from "react-icons/io5"
import { GiFairyWand } from "react-icons/gi"
import { GiStoneBlock } from "react-icons/gi"
import { TiSpiral } from "react-icons/ti"
import { FaGhost } from "react-icons/fa"
import { GiDoubleDragon } from "react-icons/gi"
import { MdDarkMode } from "react-icons/md"
import { FaRegCircle } from "react-icons/fa"
import { PiNutFill } from "react-icons/pi"
import { LiaSkullCrossbonesSolid } from "react-icons/lia"
import { LuMountain } from "react-icons/lu"
import { GiPunch } from "react-icons/gi"
import { GiFeather } from "react-icons/gi"
import { FaRegSnowflake } from "react-icons/fa"

import Image from "@/components/ui/Image"

import axios from "axios"
import { useEffect, useState } from "react"

const typeIcons = {
    fire: <ImFire />,
    water: <IoMdWater/>,
    grass: <GiHighGrass/>,
    fighting: <GiPunch/>,
    flying: <GiFeather/>,
    rock: <LuMountain/>,
    ice: <FaRegSnowflake/>,
    electric: <MdElectricBolt/>,
    bug: <IoBug/>,
    poison: <LiaSkullCrossbonesSolid/>,
    fairy: <GiFairyWand/>,
    ground: <GiStoneBlock/>,
    psychic: <TiSpiral/>,
    ghost: <FaGhost/>,
    dragon: <GiDoubleDragon/>,
    dark: <MdDarkMode/>,
    normal: <FaRegCircle/>,
    steel: <PiNutFill/>
};



const getPokemonData = async (count: number) => {
    try {
        const pokemonDataArray = [];

        for (let i = 0; i < count; i++) {
            const pokemonId: number = Math.floor(Math.random() * 1000)
            const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonId}/`)
            const pokemon = response.data

            const abilities = pokemon.abilities.map((ability: string) => ({
                name: ability.ability.name,
                description: "Short description goes here."
            }));

            const stats = pokemon.stats.map((stat: any) => ({
                name: stat.stat.name,
                base_stat: stat.base_stat
            }));

            const pokemonData = {
                name: pokemon.name,
                type: pokemon.types[0].type.name,
                image: pokemon.sprites.front_default,
                abilities: abilities,
                stats: stats
            };

            pokemonDataArray.push(pokemonData)
        }

        return pokemonDataArray
    } catch (error) {
        console.error('Error fetching Pokemon data:', error)
        return null
    }
};

const Home: React.FC = () => {

    const [pokemonData, setPokemonData] = useState(null)

    useEffect(() => {
        const fetchData = async () => {
            const data = await getPokemonData(100)
            setPokemonData(data)
        };
    
        fetchData();
    }, [])

    return (
        <>
            <div className="flex justify-center items-center mt-5">
            {pokemonData ? (
                <Carousel className="w-full max-w-xl">
                    <CarouselContent>
                        {pokemonData.map((pokemon, index) => (
                            <CarouselItem key={index}>
                                <div className="p-1">
                                    <Card>
                                        <CardHeader>
                                            <CardTitle className="capitalize">{pokemon.name}</CardTitle>
                                            <CardDescription className="capitalize inline-flex gap-1 items-center "> Pokémon type: {pokemon.type} {typeIcons[pokemon.type]} </CardDescription>
                                        </CardHeader>
                                        <CardContent className="flex aspect-square items-center justify-center p-6">
                                            <Image imgSrc={pokemon.image}></Image>
                                        </CardContent>
                                        <CardFooter className="flex flex-row justify-start items-start gap-6">
                                            <div>
                                                <p> Pokemon abilities: </p>
                                                {pokemon.abilities.map((ability, index) => (
                                                    <p className="text-wrap" key={index}>{ability.name}</p>
                                                ))}
                                            </div>
                                            <div>
                                                <p> Pokemon stats: </p>
                                                {pokemon.stats.map((stat, index) => (
                                                    <p key={index}>{stat.name}: {stat.base_stat}</p>
                                                ))}
                                            </div>
                                        </CardFooter>
                                    </Card>
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious />
                    <CarouselNext />
                </Carousel>
            ) : (
                <MoonLoader
                color="rgba(253, 213, 0, 1)"
                size={70}
                />
            )}
            </div>
        </>
    )
}

export default Home