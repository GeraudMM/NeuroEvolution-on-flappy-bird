# NeuroEvolution-on-flappy-bird

## Environment

In this project we train multiple neural networks to play flappy bird. At each generation we choose the Agents that performed the better and mutate them a little in order to converge to an optimum neural network.
The goal is to pass between the two pipes that are modelized by two white rectangles during the training process in order to gain in efficacity. Each bird gain a reward of 1 for passing a pipe.
The Episode ends when all the birds have lost.

The two actions are : 
- `0` - do nothing
- `1` - Aplly a force to go up

## Folders

There are three main folder in this project.

- `flappyBirdLike - Game` is the folder us to run and test the game by ourselves. You can launch it and mesure the difficulty. That allow you to choose how the environement should be for the bird.

- `flappyBirdLike - NN` is where you can launch the training of your agents. It is not linked to the previous folder so if you want to change variables for the training, you would have to do it directly in that folder. Here you can see how the evolution is done using genetic algorithm and Neural Networks. During this part you have a slider at the bottom right of the display. This give you the possibility to accelerate the training speed. Be carrefull though, this project is not as efficient as it could be and so it needs a lot of calculation.

- `flappyBirdLike - TrainedBird` allows you to watch a verry well trained agent evolving in an improved environement.

## Installing

In order to run this simulation, you'll have to download Atom, sublim text or visual studio. Thanks to an HTMl file, you would be able to run it your browser (use chrome for more efficiency).
I recomand you to go with [Atom](https://atom.io/) as you can directly download the Atom-live-server packages to lauch your projects locally on your browser.


### This project was made following Daniel shifman's tutorials on NeuroEvolution on YouTube. Most part of the code come from him. The neuralnetwork library was made using TensorFlow.
