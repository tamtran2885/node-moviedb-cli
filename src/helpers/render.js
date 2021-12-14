const chalk = require("chalk");

const log = console.log;

function renderPersons(obj) {
  if (obj.total_pages > obj.page) {
    log(chalk.white(`\n--------------------------------\n`));
    log(`Page: ${chalk.white(obj.page)} of: ${chalk.white(obj.total_pages)}`);
  }

  obj.results.forEach(function (person) {
    log(chalk.white(`----------------------------------------`));
    log(`\n`);
    log(`${chalk.white(`Person:\n`)}`);
    log(`ID: ${chalk.white(person.id)}`);
    log(`Name: ${chalk.blue.bold(person.name)}`);

    if (person.known_for_department === "Acting") {
      log(`Department: ${chalk.magenta(person.known_for_department)}`);
    }

    const hasAnyMovieWIthTitle = person.known_for.some(function knownForMovie(
      movie
    ) {
      return movie.title !== undefined;
    });

    if (hasAnyMovieWIthTitle) {
      log(chalk.white(`\nAppearing in movies:`));

      person.known_for.forEach(function (movie) {
        if (movie.title) {
          log(`\n`);
          log(`\t${chalk.white(`Movie:`)}`);
          log(`\tID: ${chalk.white(movie.id)}`);
          log(`\tRelease Date: ${chalk.white(movie.release_date)}`);
          log(`\tTitle: ${chalk.white(movie.title)}`);
          log(`\n`);
        }
      });
    } else {
      log(`\n`);
      log(chalk.yellow(`${person.name} doesn’t appear in any movie\n`));
    }
  });
}

function renderPerson(obj) {
  log(chalk.white(`\n----------------------------------------`));
  log(`${chalk.white(`Person:\n`)}`);
  log(`ID: ${chalk.white(obj.id)}`);
  log(`Name: ${chalk.bold.blue(obj.name)}`);
  log(
    `Birthday: ${chalk.white(obj.birthday)} ${chalk.gray("|")} ${chalk.white(
      obj.place_of_birth
    )}`
  );
  if (obj.known_for_department === "Acting") {
    log(`Department: ${chalk.magenta(obj.known_for_department)}`);
  }
  log(`Biography: ${chalk.blue.bold(obj.biography)}`);
  if (obj.also_known_as.length > 0) {
    log(`\n`);
    log(`${chalk.white(`Also known as:\n`)}`);
    obj.also_known_as.forEach(function personAKA(alias) {
      log(chalk.white(alias));
    });
  } else {
    log(`\n`);
    log(chalk.yellow(`${obj.name} doesn’t have any alternate names\n`));
  }
}

function renderMovies(obj) {
  if (obj.total_pages > obj.page) {
    log(chalk.white(`\n--------------------------------\n`));
    log(`Page: ${chalk.white(obj.page)} of: ${chalk.white(obj.total_pages)}`);
  }

  obj.results.forEach(function (movie) {
    log(chalk.white(`----------------------------------------`));
    log(`\n`);
    log(`${chalk.white(`Movie:\n`)}`);
    log(`ID: ${chalk.white(movie.id)}`);
    log(`Title: ${chalk.blue.bold(movie.title)}`);
    log(`Release Date: ${chalk.white(movie.release_date)}`);
    log(`\n`);
  });
}

function renderMovie(obj) {
  log(chalk.white(`\n----------------------------------------`));
  log(`\n`);
  log(`${chalk.white(`Movie:\n`)}`);
  log(`ID: ${chalk.white(obj.id)}`);
  log(`Title: ${chalk.blue.bold(obj.title)}`);
  log(`Release Date: ${chalk.white(obj.release_date)}`);
  log(`Runtime: ${chalk.white(obj.runtime)}`);
  log(`Vote Count: ${chalk.white(obj.vote_count)}`);
  log(`Overview: ${chalk.white(obj.overview)}`);
  log(`\n`);
  log(`${chalk.white(`Genres:\n`)}`);

  if (obj.genres.length > 0) {
    obj.genres.forEach(function showMovieGenre(genre) {
      log(chalk.white(genre.name));
    });
  } else {
    log(chalk.yellow("The movie doesn’t have a declared genre"));
  }

  log(`\n`);
  log(`${chalk.white(`Spoken Languages:\n`)}`);

  if (obj.spoken_languages.length > 0) {
    obj.spoken_languages.forEach(function showMovieLanguages(lang) {
      log(chalk.white(lang.name));
    });
  } else {
    log(
      chalk.yellow(`The movie: ${obj.id} doesn’t have any declared languages`)
    );
  }
}

module.exports = {
  renderPersons: renderPersons,
  renderPerson: renderPerson,
  renderMovies: renderMovies,
  renderMovie: renderMovie,
};
