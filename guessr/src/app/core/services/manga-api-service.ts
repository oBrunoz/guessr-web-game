import { Injectable } from '@angular/core';
import axios from 'axios';
import { resolveObjectURL } from 'buffer';

@Injectable({
    providedIn: 'root'
})

export class MangaAPIService {
    private access_token?: string;

    constructor() {
        this.access_token = '';
    }

    // SEM USO
    async getMangaList() {
        try {
            const response = await axios.get('https://api.mangadex.org/manga');
            return response; // Alteração aqui para acessar diretamente os dados
        } catch (error) {
            throw new Error(`Erro ao recuperar lista de mangás da API do Mangadex: ${error}`);
        }
    }

    async fetchSuggestions(title: string) {
        try {
            const response = await axios.get(`https://api.mangadex.org/manga?limit=10&title=${title}&status%5B%5D=completed`);
            const mangaData = response.data.data;
            const titles = mangaData.map((manga:any) => {
                let portugueseTitle = manga.attributes.altTitles.find((altTitle:any) => altTitle['pt-br']);

                if (portugueseTitle) {
                    return {
                        title: portugueseTitle['pt-br'],
                        year: manga.attributes.year,
                        author: manga.relationships.find((relation:any) => relation.type === 'author').id,
                        manga_id: manga.id,
                        manga_cover_id: manga.relationships.find((relation:any) => relation.type === 'cover_art').id
                    };
                } else {
                    // Percorre todos os altTitles e retorna o título em inglês
                    for (let altTitle of manga.attributes.altTitles) {
                        if (altTitle['en']) {
                            return {
                                title: altTitle['en'],
                                year: manga.attributes.year,
                                author: manga.relationships.find((relation:any) => relation.type === 'author').id,
                                manga_id: manga.id,
                                manga_cover_id: manga.relationships.find((relation:any) => relation.type === 'cover_art').id
                            };
                        }
                    }
                    // Se não encontrar um título em inglês, retorna o título principal em inglês
                    return {
                        title: manga.attributes.title.en,
                        year: manga.attributes.year,
                        author: manga.relationships.find((relation:any) => relation.type === 'author').id,
                        manga_id: manga.id,
                        manga_cover_id: manga.relationships.find((relation:any) => relation.type === 'cover_art').id
                    }
                }
            });

            return titles;

        } catch(error) {
            throw new Error(`Erro ao retornar sugestões: ${error}`);
        }
    }

    async getMangaAuthor(author_id: string) {
        try {
            const response = await axios.get(`https://api.mangadex.org/author/${author_id}`);
            const authorData = response.data.data;

            return authorData.attributes.name;
        } catch(error) {
            throw new Error(`Erro ao recuperar informações do autor: ${error}`)
        }
    }

    async getMangaImages(manga_id: string, manga_cover_id: string) {
        try {
            const response = await axios.get(`https://api.mangadex.org/cover/${manga_cover_id}`);
            const mangaData = response.data.data;
            console.log('teste: ', mangaData);

            const filename = mangaData.attributes.fileName;
            const response_image_url = `https://mangadex.org/covers/${manga_id}/${filename}`
        
            return response_image_url
        } catch(error) {
            throw new Error(`Erro ao recuperar imagem do manga: ${error}`);
        }
    }

    async getMangaDetails(id: string) {
        try {
            const response = await axios.get(`https://api.mangadex.org/manga/${id}`);
            return response.data.data;
        } catch(error) {
            throw new Error(`Erro ao recuperar detalhes de manga: ${error}`);
        }
    }

}
// Chama a função fetchMangaInfo para executar a requisição e lidar com a resposta.