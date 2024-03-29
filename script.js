(function(){
	var canvas = document.getElementById('game'), ctx;

	var game = {
		start: function()
		{
			game.vars = {
				selected: false, //[x,y]
				items: [
					[], //[ingredients] //fire
					[], //water
					[], //earth
					[], //air
					[0,2], //lava
					[0,1], //steam
					[2,3], //dust
					[1,3], //clouds
					[1,2], //clay
					[0,8], //brick
					[0,3], //tornado
				],
				map: [[],[],[]],
				needed: Math.floor(Math.random()*11),
				score: 0,
				sources: []
			}
			//image loading
			game.vars.itemsImg = new Image();
			game.vars.img = new Image();
			game.vars.xd = new Image();
			game.vars.itemsImg.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAUoAAAAeCAYAAABKQVdQAAAUz0lEQVR4Xu1dCXwURdZ/1XNkcocEg4IIhHAGFiQRgq4uyn6r+FNXkQSCgKiroKjLgoYAHuPBYVA/FUFlFTlECQFX3V1E/VTUTwETBJRAlABBAioIuSfJzHTX/mvIhEkymenuBDK4U/yGnuPVq6pX1f9+V1UYBUtQAkEJBCUQlIBPCbCgfIISCEogKIGgBHxL4NwFSs4ZMcaDExyUQFACQQmcaQnoBkr+Kg1gf6HdZ7qDXvlbj51PJstEmhu1qF3aDzYalEBQAu0qgV3cNsxMxkEykQJtSZHqr5xkhRFX0Ln67w1c/O5+SeT0eG9wvTcQgcahoBLeW1zfifcK8dpBzPyNGKguoOSvUDSF0AHU/xObTNvPusSeKLWSgd1Pdrk7WeMqznr7wQapYF2SWTl6vEN1lBTHjYwPn/TT3qBY9EtgFy/rMYjFHNTP4b+rZiF3PKiQ8gRGHQIQ4xaSanAVACn+E+AowM11FYXjH0zQ+o/ub09bpOIbAKME4I0ALXBX1Ocl/Zilq36gXE2J4LoPnMqpjq5hd9LWszZNVm4mU8WPaLsTXo/Q7GghLF1ldL8e3UwmfoGuyq5HloMZTaZoiUmxnMuxnPFY4sZYhvcSp8I3dh6ar5d3W9fbvqLHXUzh4/XydTk6iKKw3GLxBuOkCDcvzvkHybcXX6OX92+x3i5eNdJCxulVxDKTWYjPh8j3vPZvCknzncRGDmSmr36L8jgTY8rnPMxCNTcYyXgngO7SUGLOMJIiAJqqNUAnFnItwMxGvKKOFAv6uQ/rPFcm58YkCstn9e49fRrlaroUvL+sh+pKctJ1MMM/PxPCaMZzXukkYtLK+udEKUlKD8qKLdfTdsaQhOck4n/VU9dfHYDmu29uL77RH52/3wFC0j6iSzBRF+FJGYZHXTiulTAXtiQyVuSvvvv3/OUJCyXGZ6ml10IXBMrG0rJybhxLdUXRZOhaDvMNj9SNdqrN9KYx7ubV1xvItLYTGcJ+JqfNQfJVg1jYNi3y10ILQGELJw65knHzeLlOfnFubt5OLfUDlfZbzjtI5LgZ98UU6I8DwsjAw4mFhgA0mxY7wLGKFHsNXvgNSiT/UCF5A6fQj5IYO+ltjHqB8kYA5T8aGHIAMtENMMM/PuOCnFe2HbrNEI92HqU50Y/raTdQgXIv53EYz9WY9GvFFZP0E66FuFZjVm24xuM1DN+ZcV0ZRvRYZ8bEHLRYgkCpZ4Xoq7OH107HjfpENzJGCFvwJMmOE6Q4YdLl1JH80GAWdkRw3sXtQ8xEn4MuHNoQVeKmKiFnNfxoI/qy8Hx9rXuvtSBteCIzKbdC15qIproJKoAmmnTePOut/I/asq325pXPqy8ASGZwMizoTCazoYl+eYyc5XXkXGcnw0uDyLTTrTX66rc+oFxFd0LKyxoxFhoso9HsVnr/jAlqQfklaPfrxu3yMjIo3fVolYEElDs57wJbdjIWrwDHJLw2Y3I24vPGXoyVeJNpEedd8fuToLsCr2k9GdvYkuyDQHnGVmUjxt9z3lEm+8EEMkWEeNygeMDREXI6awj+GqJXa4heDyH6qAsZYiNJargPgVz8CMnVANViO9nHDWaRBXp7/sKoYVE10VKaZFQmI0nk9975oD+KcvuDb+W9obedQK1XyGsPxJO5h6kJUP5EjvJasl/+Oxbxndq+6wXKuQCsJ700YoemOxbPrHfUdkAT3ZNlS7Cm7mlWh5EVvsrHNPECcSAAZSHnnaE5zgbgjcdkvAlD4R3Yal/ABBBmgaqyn/ORuBFXOQG0/Rnzqh0EIlDGbjwRdfLa08G43jttXSKdoce2pzCHqoG3kmjUqFEh77//fl0r2TSqvpfXvR5FUkZnMgIHT5cyaIvHhZWHYiRy1BE3nIcnfBwZ8PF0EUGFYnK4bm10rM5JpmEDGNulpY/zb0m5zMCMdzOFRoNRqN+68J0oXJmT9VbeQr+0XgjqunfvS7KcpaduS3Vkzj8MKyl5szU893J7fkcyJAufpWf5kex4YJmjU/xYYZ519ALl8wDK+1sYhBM+y1vYHbSuNYNsVvcFHkJV5TBBWYdmv3F+iObGdNfaXnsCJRzRF8QQZcE0m4BJeB12c/Ygxo5pHYOb/gfOhVa5DktiKDTLH5vyCTSgTMireIYxwxiYP1cdTrHsR3xSSsyr+pQZ6It9yZEP6ZVDS/VmTUtPx2/Tfq3lN732Wq7LD/XgPWNe4gZW8PTi3Bfboj3gjaGQ7KVdyRgZ7nFzCvN7P8AP37uaEYAJoKR4MhBAtVHTP+HmwQPPRSvA9Reku9SSPHkwC12tto/ZtwxDcJUJ14y2wtkSW+8t91utp6LHaktN9+4jkITzqVp6VXSMPW8uLp6uirYFImiU73cg0zUI8DRQyJA7fMFlfZm5OY74aEw1UHIrWSiB/oA5HgV+49B2Jx98ZTzJbmOTSPXk+hXI4yfSyWjMaZnO0Y/mdCz0y8eDoD2A8gDnnbAKZ9cD5IrWAqTneKGdZmJC+/dh8BY3KQEHlNuqMhA9n1T+U0n6r3/uW0nruKFXT9sWmStfHUiJnH7+55Xn/XxF5HExjK75tT3NzLk4hof/Wa+2mXXvmMdhft7udCh/fGbZhsK0tDRDQrzw+/LChUvWX2+1jjBarZsFRlFm5mWRSuWFDz/9Uk6mlvUkaAt47RRoMM/A9A531wXYidQTuqAeKMX3MMEJvjKXjikAMwI31Al8qgBlNzI13Nql+HyMZA74nDGAhT2npj/Z41OL3X5INfSeNIzzt6vNobdYV2yGYaOuBCpQfu/S7o2ThWzdRUS4T5BzV18WMljd6E5R+QVKvpyGYB5FCs6VePlX492tc/SI0RT4LF/V0qEWaReUb8TaEiDtvcjKDHq4w/9qaas9gBJ+xWSYVxltCZANIgcSbEZe2ZWMNVvkgQaU3uapd15tgn13yNGKTifNsedZdjiZPLM4JeqdblurrzUa+Gsyt11cPDT+Zy1z7EkrADA7+8tK93cz7h6bisDgkWeXri2Zde+YTRLnjyxYsmHbrKljx5FRWV3jUPq/8MoGJB2oL9AqGbTKb88nY/8YkiQRYRWmNIATMNn8dkP0tcEkF6CJwA4oG9MhGCQ0SweSou9KYhEr/PUme0JqLZptZPr7q9Pod05fGh3shhm5W7xGgJvyClSg3Mtr5kWRaU4UAMxdhLxLybm2PwvJ0CITNUD5GNp5RAvTBloR4KmgGKSGt84P9OjxzhRiFubk6RE36xD/kObEXK2ln+0BlFr615a0gQSUSZvKYwuujiptaQtqx3cLI2O6dN1BXJ5RdEnUe0IO8VurOh1LjfhFp0zEOm9xu+vsSTfFKZHG72H+Zz+1dH22aGPmtNFXPLPkbV0pbwXcPhgL9atEMoXCzCMzgA/+SJ9dF5qkoLO0oLsI5ENEvApguhOpLBP6s9BD3hhaJ4+ICXPUluqUU0M1aNq7HlyzTZXWFahAuYfb/hpOpuxYMiK54FQpxQOnmuRH+7GQBVpk5B8oV1Au5m6MFqYetO9Co2x1LiEtKJtFnPl2NAtQDo2KpRkMAUV1JZCBUvi7fiAaIhJpMUmxIn8So7LAZD+C90V48vyA0Pi3alIbhDQCBijrfZFckj7anxLuLSDomjy36d3jm5puFkWx700JFylSrpKQXzUQEeVfPb/zNeNZ94x5XiHD19lLc9a0RDf9rrFDnluWs+OBByaGRRyqZdbc3Co3bdbd4ztY5Mo667J/+kzB8uRdwGtegtl3KyLaoUIj7AE9sbVFIL1INYIpbocxP3UgC20WqZ5/c3Jfo8XU6l1SCuNrs97YpkrrClygtE8MI7Y0DmlabtnD3VEB8/svSSwkV8t8+AfKlbQHDPtpYdpAKyOSezu9pauuZ6V55XsB1n398uHytTQ3VnV6UiABpUgsx+oejEfflQDDEZgYkc5xGO+/ADD+InIo8Vlo5iIlqDc+98Nv2G5F6xAiXovIaOO0qSbCChigRL965VetUDjftP+SyLUu4PvaNvrA0LC3vc1vz3zbx9hRVF00NPwG9++ovws+v8L9KZFj/a4JuJdm3Zv+IVPYtoVLc1xBotl33tR7wd//gedQ8wLalZwpluzF6xt4Z00b80/shTsGbfMOFe25SOAvjlTIfgj+xg4ieBOJBRzrR6tUy1uYj0fJubMPC7m4aZ156cOuNJnYJ2p5tUhnZyMyc7d8poZPoALlbl47LZIMT0OjFDtuoNuLQI6jwkzmixDw1LRJxSdQ8nWwBmpcN2ijFAY1wgNNDTya8SwdSfCtKY+eSKUQ4xZVLLiymOZ2aCka34xFIAAlfJaJIq0HYHgrJqMM4PcprpthYn3Wj7ETvsaNm7EPfk9HXSTXUhX4zERa0Rfe6gQSUIrADaUzV65MYl45EqCNq2RGdx1MDv970753z6+4EVvJa4qSoz9w/5a4vTLdyQ2HilPU7WCZPv3GmCNHTJW5ubny7ClpwxUj+8QhK2nPvrz+X03by7pvzEwnrOWnX1rfYJoBPB9QkJGwaHHOKlXrsJ7oO25LDyHj8ouQUH7Ih59SLU9hngsDXpjoB6AZIXIb3bRu9oShGdiq3Kq0GuBJYeabW1UrR4EKlEgPejqapJkAS5eYoE1WwXlvTWKmZ9TK3E3nGyhxQhAsBtVJmY0aZ7QBUW+9JvtpVvMqXsZedmxLUlEY9p/Pju6tgtJF0l5AWcB5BDTHdIDibQC5XujKGlxX4CmnT9ZgANAUgLkQrx34OKvp9saAAkqPCeqZdxLKsBkaELumKCXcdVKLC0C/qRheNCRK3QNS7YSDLnPauJGMyZtwNMyERUtzG7Io7rst7bzFr+e6ouxtWQq5/f87kpRajQNucLOxri2Y4ELbESlDnmlFnv0QPsqD5KjCLQ9fPeuBNJfQX8jcAYG7Mk+67HFD/0YG6dlWjQGB0cy1X6sOjAYuUDreiyPp+lBEvYVsj1PdcSNZumIDh+aYiW+gfI2QkkM+UnJ8TAeDzjAJ/s3WFCsOBTGXI8rJmj05W2Rr4wn0pLpTWNoLKAFql0HwM6EFroDtudHKmCstpbVlH+fiJJX7wKyqL2Mve/ILVKAUfezyfxVxR/4Y1aA9JxXwiDpbzVGSnROLUqPeba1cmtav90c2gLJ18mSLLcK2myvKPYuWrv+wLduD+ZeI80T24EwBnLYldexKhrimYGhzbV2UZbgTDIiWE6LljbogfJP7yFGNZKIpSSx0jThpSKLQDImUN/C5Uc5sdkbqU6iuOa3J3SDaqjXZWRe1EW9RL3CBsu67eDINEBo4duNUYfvo3d78umrm2zdQLie9Ee9qhFbi2RTXHnD9ZUE5zAhSb0ZwfphCo/uoDei0F1DqF4j+mgELlPDN9sirHn9waESjwESv/Mqpju8iVhTf1jzVSb8UTtWcNS0j6aklbzXaGph1b/oShWrnZb/43tHW8m9afw+vvtZEYR87yfY/SP7J6UmmMPeNh9xJJ/aBV+EcxdGcpLuhFFwVT1I0/JkN7q6fSa4rJ+cnfZlFbG/1WbIzhq5EVtIkf3Qt/c44W/3gm1s01Q9UoNzD7b9ih1ScSNE6SY79fSgEyqS+w759A+UqWo82btYsdIXWsttIVcTMJ+8F5e+h/etVt68ok+ihDqqT3M8loBTBHkyyph0TnnILVKDssdU2xmDkudCmfncgRf3eW9VrogmhSPsxMoPY5pny1Iu5ul0detv/nts/iiVphABC7P22wSTfD01nlPugDHGgQwQZvowmY5fzyWAWienwb1YYyZyIu9yva2BRxiXzuWSYrbd/SGz//Zw1+adOBlNZHN26XQpN1GswTiWLZmSyoiwLPXxYX1oiuIn7pZActi5kCjkKbRxZAmOSmGWT3v74Bkq9EW+JbmqT/d6PVvQmM39XVcSb+A74J5O1/HmIQAJK+C3NyBC+CmZzH6gSXTChFwIVXVdMUmcxwViMxbgU4bpPpAgh2r0P77e3dDTUuQCUI6zcWHJ91ZSi5MglehexlnrWtLSImvP486XO2KnLli07K3vKPfuHtKGLGBn2mjCbmOscZE9ObbqvH2sB6WD2z5BalFiNZFIH8VsHsJANaseZPS71ofpNImqruOl2Z67ZOlBrpUCk38ltXULJuAfJ5pHlJOch8KV9S6fHwPxplN9iPrUKrgLH+ca3Osnc3UnriSgyG0X+23U+J0TmI+nhGE1pEe0NlNjvbYoSp8QjsAPAuw7XbzFGYRKK04JKcCOVIPuu5DBeF546rTkBNIkA0F7iKtKEAJgi13Ij7vhXWop4C7kFqkYZiDfZme5TAXfMxHSeSGLmFS21JQJ+OF/xA/ghf+nDLKO19mnRLcPH40zU5d526GAhOZlEh3BqUBEUi/1c5kWKwotMEu2cuTYPy+3cL/hTEalhZNoETRL6h/Py1h5b5z+P8lW6GP7l8dDqxgntRoUIVyPJXJOPwy9P8YfE5pU9Dt/LXNA27zOjf0Ob9A2kXhppD6AU4IjDMEYC7MQhDSI3sAADykE0c0MCY5p3nuzgPAb7SnHOoDiw1PXHQpbh86pujDXanREESr+rLOAIRHAO82rRmvPnHkj2hCGXAydmKhICSZzvx4k8RYpNLpLLIg9ZN5/a1/5bLSI1y0AGBKL5v/szi2ZsaCoXv0DproCnEMMRF1cgdzYD79Jc+bPeCodmNBnAdSbKk2U3I6K3EljZcOAAmpGRDjGQZkVq3o3QHkCJiPdVAMXHRaI4/thPLo56athx0lqRiROEcGNNBe88+LMapXcEgbK10g3WP5ckUMBtM+HiyIbvu88AZlH9lwBaGqNqoPRkgD8uZsK/qwFaQtMUWpEbuEqRZH4+ksxVn6WoWfgLqwbiVGacd8kSXHU5ewV/jXGqZj6o0B5AqaefbVEnCJRtIcUgj3NFAjjF6T4jSb37MPN9bdFnXUDZCDQXASTjAJYGgKZCRxDt1gVamgZjLY9FkCcH/pdUqjYm0nx9hyX8NwHl18sv/IPEzcM1yVklMQ5QOJB8x8G2PX9UZdtBsqAEzoYEWg2UZ6OTXtsQ2+CKSi+lObFet+y1W7+CDQclEJTAb04C5y5Q/uamIjigoASCEghUCQSBMlBnJtivoASCEggYCfwHUSvkl9Y0QvMAAAAASUVORK5CYII=';
			game.vars.img.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAMAAADW3miqAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA2ZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDpBNTY5QzBFMkJBMjdFNDExQjJENjk2MTM0RjVCM0EzQSIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo1M0MwMTE3NzI3QkIxMUU0ODc4MEMyOTFGM0EwMTYwRiIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo1M0MwMTE3NjI3QkIxMUU0ODc4MEMyOTFGM0EwMTYwRiIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M2IChXaW5kb3dzKSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkE3NjlDMEUyQkEyN0U0MTFCMkQ2OTYxMzRGNUIzQTNBIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkE1NjlDMEUyQkEyN0U0MTFCMkQ2OTYxMzRGNUIzQTNBIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+76GfnwAAABVQTFRFb7dhbylhmYZ1Kioq////BQUFFRUVRKeP3AAAAAV0Uk5T/////wD7tg5TAAAATklEQVR42mJgIQIwsDCAAYzPBAYwHiMYDGVFRAUBFDCDARo1bBThDwJo8GE1CSo3hBWNpgLigoANDLBnKWh2AypiBYLBpogYhxMBAAIMAMaLEImEZlMDAAAAAElFTkSuQmCC';
			game.vars.xd.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHgAAAA8CAMAAACac46aAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NzI1QTk0ODMyN0FEMTFFNEJDQzM5MUQ3ODdCRTYxNUQiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NzI1QTk0ODQyN0FEMTFFNEJDQzM5MUQ3ODdCRTYxNUQiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo3MjVBOTQ4MTI3QUQxMUU0QkNDMzkxRDc4N0JFNjE1RCIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo3MjVBOTQ4MjI3QUQxMUU0QkNDMzkxRDc4N0JFNjE1RCIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PnhNRO0AAAAGUExURc3Nwv///8VumFAAAAACdFJOU/8A5bcwSgAAATxJREFUeNrsmEsCwyAIROH+l+4yUT4yBOwGl4H0tRaHQeI/LRrwgAc8YOhjqBpMRGha1S+OkJekqv84QF5TyorrSN4S6qr6QN7DhcfJJYsgvSLGWsJJsgyhYBdtRpVAECy+CETWHteCdbL+EAejZP2NarBSvsb2a28KsFZuUaEw0uvBmySbhZ4AA0piZ4fAhIH5ffj5JpiffeJCcFS3/VwPzCo43DEOIhcAJ7iHfUbBWI8sBBPGzW41v8Gc2OdscS1FxQxW1smTdICfvJSA8AYOkxfbnpBM4Xcg1frQJKTRQjtEri1yDqzYSdAIbHUWkkHD1vnWJwDmpLP2zV4YTCj3YG+1viKU0ic7Z8cx9N/Brk7ZI0zztGgPbd3zcdeYCp/wi3cgHVcRePe4e8/Vcvkyd5kDHvCAr62fAAMAzAwYFobl3vcAAAAASUVORK5CYII=';

			//recalculating dimensions
			game.calculateScale();

			window.addEventListener('orientationchange', function(){
				game.calculateScale();
			}, false);
			window.addEventListener('resize', function(){
				game.calculateScale();
			}, false);

			//first map generation
			for(var i = 0; i < 3; i++)
			{
				for(var j = 0; j < 3; j++)
					game.vars.map[i][j] = Math.floor(Math.random()*4);
			}
			for(var i = 0; i < 4; i++)
			{
				var rand;
				do
					rand = Math.floor(Math.random()*4);
				while(game.vars.sources.indexOf(rand) != -1)
				game.vars.sources[i] = rand;
			}

			game.renderBoard();

			//user events
			canvas.onclick = function(e)
			{
				game.click(e.layerX, e.layerY);
			}
			document.addEventListener('touchstart', function(e)
			{
				game.click((e.changedTouches[0].pageX-canvas.offsetLeft - 180)/game.scale+180, (e.changedTouches[0].pageY-canvas.offsetTop - 180)/game.scale+180);
				e.preventDefault();
			});
		},

		calculateScale: function()
		{
			setTimeout(function(){
				game.scale = Math.min(window.innerWidth / 360, window.innerHeight / 360);
				//fill screen on mobiles
				if( /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent) )
					canvas.style.transform = canvas.style.webkitTransform = 'scale('+game.scale+')';
			}, 100);
		},

		renderBoard: function()
		{
			ctx.clearRect(0, 0, 360, 360);
			ctx.drawImage(game.vars.img, 0, 0, 360, 360);

			//click effect
			if(game.vars.selected != false)
			{
				ctx.fillStyle = "rgb(110,110,110)";
	      		ctx.fillRect (10+game.vars.selected[0]*70, 10+game.vars.selected[1]*70, 60, 60);
			}

			//redrawing
			for(var i = 0; i < 3; i++)
			{
				for(var j = 0; j < 3; j++)
				{
					if(game.vars.map[i][j] !== false)
						game.drawItem(i+1,j+1,game.vars.map[i][j]);
				}
			}
			//item needed
			game.drawItem(0, 4, game.vars.needed);

			//4 elements
			game.drawItem(2,0,game.vars.sources[0]);
			game.drawItem(4,2,game.vars.sources[1]);
			game.drawItem(2,4,game.vars.sources[2]);
			game.drawItem(0,2,game.vars.sources[3]);

			//external links
	        ctx.drawImage(game.vars.xd, 0, 0, 60, 60, 10, 10, 60, 60)
	        ctx.drawImage(game.vars.xd, 60, 0, 60, 60, 290, 290, 60, 60)

	        //score
		    ctx.fillStyle = "white";
		    ctx.font = "30px Arial";
            ctx.textAlign = "center";
		    ctx.fillText(game.vars.score, 320, 50);
		    
		    //10 fps
			setTimeout(game.renderBoard, 100);
		},

		drawItem: function(x, y, item)
		{
			if(item == 11)
			{
				ctx.fillStyle = "rgb(16,100,255)";
	        	ctx.fillRect (10+x*70, 10+y*70, 60, 60);
	        }
	        else
	        	ctx.drawImage(game.vars.itemsImg, 30*item, 0, 30, 30, 25+x*70, 25+y*70, 30, 30)
		},

		click: function(x, y)
		{
			if(5 < x && x < 355 && 5 < y && y < 355)
			{
				//grid click position
				var gridX = Math.floor((x-5)/70);
				var gridY = Math.floor((y-5)/70);
				var check = false;

				game.drawItem(gridX, gridY, 11);

				//3x3 items grid handler
				if(0 < gridX && gridX < 4 && 0 < gridY && gridY < 4)
				{
					if(game.vars.selected[0] == gridX && game.vars.selected[1] == gridY)
						game.vars.selected = false;
					else
					{
						if(game.vars.selected != false)
						{
							//crafting
							for(var i = 0; i < game.vars.items.length; i++)
							{
								if(game.vars.items[i].indexOf(game.vars.map[game.vars.selected[0]-1][game.vars.selected[1]-1]) != -1
									&& game.vars.items[i].indexOf(game.vars.map[gridX-1][gridY-1]) != -1
									&& game.vars.items[i].indexOf(game.vars.map[gridX-1][gridY-1]) != game.vars.items[i].indexOf(game.vars.map[game.vars.selected[0]-1][game.vars.selected[1]-1])
								)
								{
									game.vars.map[game.vars.selected[0]-1][game.vars.selected[1]-1] = false;
									game.vars.map[gridX-1][gridY-1] = i;
									game.vars.selected = false;
									check = true;
									break;
								}
							}
						}
						if(!check)
							game.vars.selected = [gridX, gridY];
					}
				}

				//item needed
				if(gridX == 0 && gridY == 4)
				{
					if(game.vars.selected != false)
					{
						if(game.vars.needed == game.vars.map[game.vars.selected[0]-1][game.vars.selected[1]-1])
						{
							game.vars.map[game.vars.selected[0]-1][game.vars.selected[1]-1] = false;
							game.vars.needed = Math.floor(Math.random()*11);
							game.vars.score++;
						}
						game.vars.selected = false;
					}
				}

				//restart game
				if(gridX == 4 && gridY == 4)
					window.location.reload();
				//developer site
				if(gridX == 0 && gridY == 0)
					window.open('http://tanner.zone/');

				//fill with element
				if(gridX == 2 && gridY == 0)
				{
					for(var i = 0; i < 3; i++)
					{
						for(var j = 0; j < 3; j++)
						{
							if(game.vars.map[i][j] === false)
							game.vars.map[i][j] = game.vars.sources[0];
						}
					}
				}

				//fill with element
				if(gridX == 4 && gridY == 2)
				{
					for(var i = 0; i < 3; i++)
					{
						for(var j = 0; j < 3; j++)
						{
							if(game.vars.map[i][j] === false)
							game.vars.map[i][j] = game.vars.sources[1];
						}
					}
				}

				//fill with element
				if(gridX == 2 && gridY == 4)
				{
					for(var i = 0; i < 3; i++)
					{
						for(var j = 0; j < 3; j++)
						{
							if(game.vars.map[i][j] === false)
							game.vars.map[i][j] = game.vars.sources[2];
						}
					}
				}

				//fill with element
				if(gridX == 0 && gridY == 2)
				{
					for(var i = 0; i < 3; i++)
					{
						for(var j = 0; j < 3; j++)
						{
							if(game.vars.map[i][j] === false)
							game.vars.map[i][j] = game.vars.sources[3];
						}
					}
				}
			}
		}
	};

	if (canvas.getContext){
		ctx = canvas.getContext('2d');
		ctx.imageSmoothingEnabled = ctx.webkitImageSmoothingEnabled = ctx.mozImageSmoothingEnabled = false;
		window.onload = game.start;
	}

})()