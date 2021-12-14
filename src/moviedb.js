#!/usr/bin/env node

const { Command } = require("commander");
const ora = require("ora");

const dotenv = require("dotenv");
dotenv.config();

const api_key = process.env.API_KEY;

const program = new Command();
program.version("0.0.1");

const {
  renderPersons,
  renderPerson,
  renderMovies,
  renderMovie,
} = require("./helpers/render");

const { getRequestData } = require("./helpers/request");

program
  .command("get-persons")
  .description("Make a network request to fetch most popular persons")
  .requiredOption("-p, --popular", "Fetch the popular persons")
  .requiredOption(
    "--page <number>",
    "The page of persons data results to fetch"
  )
  .action(function handleAction(options) {
    const spinner = ora("Fetching the persons data...");
    spinner.start();
    if (options.popular && options.page) {
      const url = `https://api.themoviedb.org/3/person/popular?page=${options.page}&api_key=${api_key}`;

      getRequestData(url, renderPersons);
      if (getRequestData) {
        spinner.succeed("Popular Persons data loaded");
      } else {
        spinner.fail("Can not download persons data");
      }
    }
  });

program
  .command("get-person")
  .description("Make a network request to fetch the data of a single person")
  .requiredOption("-i, --id <personId>", "The id of the person")
  .action(function handleAction(options) {
    const spinner = ora("Fetching the person data...").start();
    if (options.id) {
      const url = `https://api.themoviedb.org/3/person/${options.id}?api_key=${api_key}`;

      getRequestData(url, renderPerson);
      if (getRequestData) {
        spinner.succeed("Person data loaded");
      } else {
        spinner.fail("Can not download person data");
      }
    }
  });

program
  .command("get-movies")
  .description("Make a network request to fetch movies")
  .requiredOption("--page <number>", "The page of movies data results to fetch")
  .option("-p, --popular", "Fetch the popular movies", false)
  .option("-n, --now_playing", "Fetch the movies that are playing now", false)
  .action(function handleAction(options) {
    const spinner = ora("Fetching the movies data...").start();
    if (options.page) {
      const url = `https://api.themoviedb.org/3/movie/popular?page=${options.page}&api_key=${api_key}`;

      getRequestData(url, renderMovies);
    }

    if (options.now_playing) {
      const url = `https://api.themoviedb.org/3/movie/now_playing?page=${options.page}&api_key=${api_key}`;

      getRequestData(url, renderMovies);
    }
    if (getRequestData) {
      spinner.succeed("Movies data loaded");
    } else {
      spinner.fail("Can not download movies data");
    }
  });

program
  .command("get-movie")
  .description("Make a network request to fetch the data of a single person")
  .requiredOption("-i, --id <movieId>", "The id of the movie")
  .option("-r, --reviews", "Fetch the reviews of the movie")
  .action(function handleAction(options) {
    const spinner = ora("Fetching the movie data...").start();
    if (options.id) {
      const url = `https://api.themoviedb.org/3/movie/${options.id}?api_key=${api_key}`;

      getRequestData(url, renderMovie);
      if (getRequestData) {
        spinner.succeed("Movie data loaded");
      } else {
        spinner.fail("Can not download movie data");
      }
    }
  });

// error on unknown commands
program.on("command:*", function () {
  console.error(
    "Unknown command: %s\nSee --help for a list of available commands.",
    program.args.join(" ")
  );
  process.exit(1);
});

program.parse(process.argv);
