import React, { useState, useEffect, useCallback } from 'react'
import { useHistory, useParams } from 'react-router'

import './movie-grid.scss'

import MovieCard from '../movie-card/MovieCard'
import tmdbApi, { category, movieType, tvType } from '../../api/tmdbApi'
import Button, { OutlineButton } from '../button/Button'
import Input from '../input/Input'

const MovieGrid = (props) => {
	const [items, setItems] = useState([])

	const [page, setPage] = useState(1)

	const [totalPage, setTotalPage] = useState(0)

	const { keyword } = useParams()

	useEffect(() => {
		const getList = async () => {
			let response = null
			if (keyword === undefined) {
				const params = {}
				switch (props.category) {
					case category.movie:
						response = await tmdbApi.getMoviesList(movieType.top_rated, {
							params
						})
						break
					default:
						response = await tmdbApi.getTvList(tvType.popular, {
							params
						})
				}
			} else {
				const params = {
					query: keyword
				}
				response = await tmdbApi.search(props.category, { params })
			}
			setItems(response.results)
			setTotalPage(response.total_pages)
		}
		getList()
	}, [props.category, keyword])

	const loadMore = async () => {
		let response = null
		if (keyword === undefined) {
			const params = {
				page: page + 1
			}
			switch (props.category) {
				case category.movie:
					response = await tmdbApi.getMoviesList(movieType.upcoming, {
						params
					})
					break
				default:
					response = await tmdbApi.getTvList(tvType.popular, {
						params
					})
			}
		} else {
			const params = {
				query: keyword
			}
			response = await tmdbApi.search(props.category, { params })
		}

		setItems([...items, ...response.results])
		setPage(page + 1)
	}

	return (
		<>
			<div className='section mb-3'>
				<MovieSearch keyword={keyword} category={props.category} />
			</div>
			<div className='movie-grid'>
				{items.map((item, i) => (
					<MovieCard key={i} item={item} category={props.category} />
				))}
			</div>
			{page < totalPage ? (
				<div className='movie-grid__loadmore'>
					<OutlineButton className='small' onClick={loadMore}>
						Load more
					</OutlineButton>
				</div>
			) : null}
		</>
	)
}

export const MovieSearch = (props) => {
	const history = useHistory()

	const [keyword, setKeyword] = useState(props.keyword ? props.keyword : '')

	const goToSearch = useCallback(() => {
		if (keyword.trim().length > 0) {
			history.push(`${category[props.category]}/search/${keyword}`)
		}
	}, [keyword, props.category, history])

	useEffect(() => {
		const enterEvent = (e) => {
			e.preventDefault()
			if (e.keyCode === 13) {
				goToSearch()
			}
		}
		window.addEventListener('keyup', enterEvent)
		return () => {
			window.removeEventListener('keyup', enterEvent)
		}
	}, [keyword, goToSearch])

	return (
		<div className='movie-search'>
			<Input
				type='text'
				value={keyword}
				placeholder='Enter Keyword'
				onChange={(e) => setKeyword(e.target.value)}
			/>
			<Button className='small' onClick={goToSearch}>
				Search
			</Button>
		</div>
	)
}

export default MovieGrid
