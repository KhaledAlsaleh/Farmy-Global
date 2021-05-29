import fs from 'fs';
import axios from 'axios';
import cheerio from 'cheerio';

const bundles = [
  {
    name: '',
    image: '',
    description: '',
    status: '',
    category: '',
    price: 19,
    countInStock: 25,
    rating: 0,
    numReviews: 0,
  },
  {
    name: '',
    image: '',
    description: '',
    status: '',
    category: '',
    price: 19,
    countInStock: 25,
    rating: 0,
    numReviews: 0,
  },
  {
    name: '',
    image: '',
    description: '',
    status: '',
    category: '',
    price: 19,
    countInStock: 25,
    rating: 0,
    numReviews: 0,
  },
];

// This is a sample website to scrape data from it, we could change it later...
const prepareBundlesData = () => {
  axios.get('https://shop.mindfulchef.com/').then((res) => {
    const $ = cheerio.load(res.data);

    $('.grid__item')
      .find('.collection-item__title')
      .each((index, element) => {
        bundles[index].name = $(element).text();
      });

    $('.grid__item')
      .find('.lazyload-blur-wrapper')
      .each((index, element) => {
        const link = $(element).children('img').attr('src').replace(/150x/g, '1000x1000');
        if (link.includes('collections')) {
          bundles[index].image = link;

          bundles[index].category = link
            .split('/collections/')
            .pop()
            .split('_650x650_')[0]
            .replace(/_/g, ' ')
            .toUpperCase();
        }
      });
  });
};

const prepareBundlesDescription = () => {
  axios.get('https://shop.mindfulchef.com/collections/healthy-ready-meals').then((res) => {
    const $ = cheerio.load(res.data);

    bundles[0].description = $('.collection-sidebar__description')
      .last('p')
      .last('span')
      .text()
      .replace(/\s\s+/g, '')
      .split('\n')[0];

    bundles[0].status = $('.collection-sidebar__description')
      .last('p')
      .last('span')
      .text()
      .replace(/\s\s+/g, '')
      .split('\n')[1];
  });

  axios.get('https://shop.mindfulchef.com/collections/smoothies').then((res) => {
    const $ = cheerio.load(res.data);

    bundles[1].description = $('.collection-sidebar__description')
      .last('p')
      .last('span')
      .text()
      .replace(/\s\s+/g, '')
      .split('\n')[0];

    bundles[1].status = $('.collection-sidebar__description')
      .last('p')
      .last('span')
      .text()
      .replace(/\s\s+/g, '')
      .split('\n')[1];
  });

  axios
    .get('https://shop.mindfulchef.com/collections/gift-vouchers')
    .then((res) => {
      const $ = cheerio.load(res.data);

      bundles[2].description = $('.collection-sidebar__description')
        .last('p')
        .last('span')
        .text()
        .replace(/\s\s+/g, '')
        .split('\n')[0];
      if (!bundles[2].description) {
        bundles[2].description = 'Default Description';
      }
      bundles[2].status = $('.collection-sidebar__description')
        .last('p')
        .last('span')
        .text()
        .replace(/\s\s+/g, '')
        .split('\n')[1];
      if (!bundles[2].status) {
        bundles[2].status = 'Default Status';
      }
    })
    .then(() => {
      fs.writeFile('./data/bundles.json', JSON.stringify(bundles, null, 4), (error) => {
        if (error) {
          throw new Error(error);
        }
      });
    });
};

// prepareBundlesData();
// prepareBundlesDescription();

const ingredientsFirstBundle = [
  {
    name: '',
    image: '',
    description: '',
    status: '',
    category: '',
    price: 0,
    countInStock: 0,
    rating: 0,
    numReviews: 0,
  },
  {
    name: '',
    image: '',
    description: '',
    status: '',
    category: '',
    price: 0,
    countInStock: 0,
    rating: 0,
    numReviews: 0,
  },
  {
    name: '',
    image: '',
    description: '',
    status: '',
    category: '',
    price: 0,
    countInStock: 0,
    rating: 0,
    numReviews: 0,
  },
  {
    name: '',
    image: '',
    description: '',
    status: '',
    category: '',
    price: 0,
    countInStock: 0,
    rating: 0,
    numReviews: 0,
  },
  {
    name: '',
    image: '',
    description: '',
    status: '',
    category: '',
    price: 0,
    countInStock: 0,
    rating: 0,
    numReviews: 0,
  },
  {
    name: '',
    image: '',
    description: '',
    status: '',
    category: '',
    price: 0,
    countInStock: 0,
    rating: 0,
    numReviews: 0,
  },
];

const prepareFirstIngredientsData = () => {
  axios
    .get('https://shop.mindfulchef.com/collections/healthy-ready-meals')
    .then((res) => {
      const $ = cheerio.load(res.data);

      $('.grid__item')
        .find('.product-grid--title')
        .each((index, element) => {
          if (index < 6) {
            ingredientsFirstBundle[index].name = $(element).text().replace(/\s\s+/g, '');
          }
        });

      $('.grid__item')
        .find('.lazyload-blur-wrapper')
        .each((index, element) => {
          if (index < 6) {
            const link = $(element).children('img').attr('src').replace(/150x/g, '1000x1000');
            if (link.includes('products')) {
              ingredientsFirstBundle[index].image = link;
            }
            if (link.includes('products')) {
              ingredientsFirstBundle[index].category = link
                .split('/products/')
                .pop()
                .split('_1000x1000')[0]
                .replace(/_/g, ' ')
                .toUpperCase();
            }
          }
        });

      $('.grid__item')
        .find('.pricing-unit')
        .children('span')
        .each((index, element) => {
          if (index < 6) {
            ingredientsFirstBundle[index].price = $(element)
              .text()
              .replace(/\s\s+/g, '')
              .replace(/Regular price/g, '')
              .replace(/Sale price/g, '')
              .replace(/\s\s+/g, '');
            if (!ingredientsFirstBundle[index].price) {
              ingredientsFirstBundle[index].price = 9.99;
            }
          }
        });
    })
    .then(() => {
      fs.writeFile(
        './data/ingredientsFirstBundle.json',
        JSON.stringify(ingredientsFirstBundle, null, 4),
        (error) => {
          if (error) {
            throw new Error(error);
          }
        },
      );
    });
};

const prepareFirstIngredientsDescription = () => {
  axios
    .get(
      'https://shop.mindfulchef.com/collections/healthy-ready-meals/products/spicy-panang-chicken-curry-with-black-rice',
    )
    .then((res) => {
      const $ = cheerio.load(res.data);

      ingredientsFirstBundle[0].description = $('.product-description')
        .last('p')
        .last('span')
        .text()
        .replace(/\s\s+/g, '')
        .split('\n')[0];
    })
    .then(() => {
      fs.writeFile(
        './data/ingredientsFirstBundle.json',
        JSON.stringify(ingredientsFirstBundle, null, 4),
        (error) => {
          if (error) {
            throw new Error(error);
          }
        },
      );
    });

  axios
    .get(
      'https://shop.mindfulchef.com/collections/healthy-ready-meals/products/creamy-coconut-fish-pie-with-sweet-potato-mash',
    )
    .then((res) => {
      const $ = cheerio.load(res.data);

      ingredientsFirstBundle[1].description = $('.product-description')
        .last('p')
        .last('span')
        .text()
        .replace(/\s\s+/g, '')
        .split('\n')[0];
    })
    .then(() => {
      fs.writeFile(
        './data/ingredientsFirstBundle.json',
        JSON.stringify(ingredientsFirstBundle, null, 4),
        (error) => {
          if (error) {
            throw new Error(error);
          }
        },
      );
    });
  axios
    .get(
      'https://shop.mindfulchef.com/collections/healthy-ready-meals/products/chicken-tikka-masala-with-brown-rice',
    )
    .then((res) => {
      const $ = cheerio.load(res.data);

      ingredientsFirstBundle[2].description = $('.product-description')
        .last('p')
        .last('span')
        .text()
        .replace(/\s\s+/g, '')
        .split('\n')[0];
    })
    .then(() => {
      fs.writeFile(
        './data/ingredientsFirstBundle.json',
        JSON.stringify(ingredientsFirstBundle, null, 4),
        (error) => {
          if (error) {
            throw new Error(error);
          }
        },
      );
    });
  axios
    .get(
      'https://shop.mindfulchef.com/collections/healthy-ready-meals/products/veggie-shepherds-pie-with-chestnuts',
    )
    .then((res) => {
      const $ = cheerio.load(res.data);

      ingredientsFirstBundle[3].description = $('.product-description')
        .last('p')
        .last('span')
        .text()
        .replace(/\s\s+/g, '')
        .split('\n')[0];
    })
    .then(() => {
      fs.writeFile(
        './data/ingredientsFirstBundle.json',
        JSON.stringify(ingredientsFirstBundle, null, 4),
        (error) => {
          if (error) {
            throw new Error(error);
          }
        },
      );
    });
  axios
    .get(
      'https://shop.mindfulchef.com/collections/healthy-ready-meals/products/lentil-moussaka-creamy-coconut-bechamel?variant=29230485864557',
    )
    .then((res) => {
      const $ = cheerio.load(res.data);

      ingredientsFirstBundle[4].description = $('.product-description')
        .last('p')
        .last('span')
        .text()
        .replace(/\s\s+/g, '')
        .split('\n')[0];
    })
    .then(() => {
      fs.writeFile(
        './data/ingredientsFirstBundle.json',
        JSON.stringify(ingredientsFirstBundle, null, 4),
        (error) => {
          if (error) {
            throw new Error(error);
          }
        },
      );
    });
  axios
    .get('https://shop.mindfulchef.com/collections/healthy-ready-meals/products/lamb-tagine')
    .then((res) => {
      const $ = cheerio.load(res.data);

      ingredientsFirstBundle[5].description = $('.product-description')
        .last('p')
        .last('span')
        .text()
        .replace(/\s\s+/g, '')
        .split('\n')[0];
    })
    .then(() => {
      fs.writeFile(
        './data/ingredientsFirstBundle.json',
        JSON.stringify(ingredientsFirstBundle, null, 4),
        (error) => {
          if (error) {
            throw new Error(error);
          }
        },
      );
    });
};

// prepareFirstIngredientsData();
// prepareFirstIngredientsDescription();

const ingredientsSecondBundle = [
  {
    name: '',
    image: '',
    description: '',
    status: '',
    category: '',
    price: 0,
    countInStock: 0,
    rating: 0,
    numReviews: 0,
  },
  {
    name: '',
    image: '',
    description: '',
    status: '',
    category: '',
    price: 0,
    countInStock: 0,
    rating: 0,
    numReviews: 0,
  },
  {
    name: '',
    image: '',
    description: '',
    status: '',
    category: '',
    price: 0,
    countInStock: 0,
    rating: 0,
    numReviews: 0,
  },
  {
    name: '',
    image: '',
    description: '',
    status: '',
    category: '',
    price: 0,
    countInStock: 0,
    rating: 0,
    numReviews: 0,
  },
  {
    name: '',
    image: '',
    description: '',
    status: '',
    category: '',
    price: 0,
    countInStock: 0,
    rating: 0,
    numReviews: 0,
  },
  {
    name: '',
    image: '',
    description: '',
    status: '',
    category: '',
    price: 0,
    countInStock: 0,
    rating: 0,
    numReviews: 0,
  },
];

const prepareSecondIngredientsData = () => {
  axios
    .get('https://shop.mindfulchef.com/collections/smoothies')
    .then((res) => {
      const $ = cheerio.load(res.data);

      $('.grid__item')
        .find('.product-grid--title')
        .each((index, element) => {
          if (index < 6) {
            ingredientsSecondBundle[index].name = $(element).text().replace(/\s\s+/g, '');
          }
        });

      $('.grid__item')
        .find('.lazyload-blur-wrapper')
        .each((index, element) => {
          if (index < 6) {
            const link = $(element).children('img').attr('src').replace(/150x/g, '1000x1000');
            if (link.includes('products')) {
              ingredientsSecondBundle[index].image = link;
            }
            if (link.includes('products')) {
              ingredientsSecondBundle[index].category = link
                .split('/products/')
                .pop()
                .split('_1000x1000')[0]
                .replace(/_/g, ' ')
                .toUpperCase();
            }
          }
        });

      $('.grid__item')
        .find('.pricing-unit')
        .children('span')
        .each((index, element) => {
          if (index < 6) {
            ingredientsSecondBundle[index].price = $(element)
              .text()
              .replace(/\s\s+/g, '')
              .replace(/Regular price/g, '')
              .replace(/Sale price/g, '')
              .replace(/\s\s+/g, '');
            if (!ingredientsSecondBundle[index].price) {
              ingredientsSecondBundle[index].price = 9.99;
            }
          }
        });
    })
    .then(() => {
      fs.writeFile(
        './data/ingredientsSecondBundle.json',
        JSON.stringify(ingredientsSecondBundle, null, 4),
        (error) => {
          if (error) {
            throw new Error(error);
          }
        },
      );
    });
};

const prepareSecondIngredientsDescription = () => {
  axios
    .get('https://shop.mindfulchef.com/collections/smoothies/products/new-breakfast-bundle')
    .then((res) => {
      const $ = cheerio.load(res.data);

      ingredientsSecondBundle[0].description = $('.product-description')
        .last('p')
        .last('span')
        .text()
        .replace(/\s\s+/g, '')
        .split('\n')[0];
    })
    .then(() => {
      fs.writeFile(
        './data/ingredientsSecondBundle.json',
        JSON.stringify(ingredientsSecondBundle, null, 4),
        (error) => {
          if (error) {
            throw new Error(error);
          }
        },
      );
    });

  axios
    .get('https://shop.mindfulchef.com/collections/smoothies/products/flavour-blast')
    .then((res) => {
      const $ = cheerio.load(res.data);

      ingredientsSecondBundle[1].description = $('.product-description')
        .last('p')
        .last('span')
        .text()
        .replace(/\s\s+/g, '')
        .split('\n')[0];
    })
    .then(() => {
      fs.writeFile(
        './data/ingredientsSecondBundle.json',
        JSON.stringify(ingredientsSecondBundle, null, 4),
        (error) => {
          if (error) {
            throw new Error(error);
          }
        },
      );
    });
  axios
    .get(
      'https://shop.mindfulchef.com/collections/smoothies/products/taster-smoothie-bundle-pack-of-6',
    )
    .then((res) => {
      const $ = cheerio.load(res.data);

      ingredientsSecondBundle[2].description = $('.product-description')
        .last('p')
        .last('span')
        .text()
        .replace(/\s\s+/g, '')
        .split('\n')[0];
    })
    .then(() => {
      fs.writeFile(
        './data/ingredientsSecondBundle.json',
        JSON.stringify(ingredientsSecondBundle, null, 4),
        (error) => {
          if (error) {
            throw new Error(error);
          }
        },
      );
    });
  axios
    .get(
      'https://shop.mindfulchef.com/collections/smoothies/products/mango-lime-smoothie-pack-of-5',
    )
    .then((res) => {
      const $ = cheerio.load(res.data);

      ingredientsSecondBundle[3].description = $('.product-description')
        .last('p')
        .last('span')
        .text()
        .replace(/\s\s+/g, '')
        .split('\n')[0];
    })
    .then(() => {
      fs.writeFile(
        './data/ingredientsSecondBundle.json',
        JSON.stringify(ingredientsSecondBundle, null, 4),
        (error) => {
          if (error) {
            throw new Error(error);
          }
        },
      );
    });
  axios
    .get(
      'https://shop.mindfulchef.com/collections/smoothies/products/watermelon-smoothie-pack-of-5',
    )
    .then((res) => {
      const $ = cheerio.load(res.data);

      ingredientsSecondBundle[4].description = $('.product-description')
        .last('p')
        .last('span')
        .text()
        .replace(/\s\s+/g, '')
        .split('\n')[0];
    })
    .then(() => {
      fs.writeFile(
        './data/ingredientsSecondBundle.json',
        JSON.stringify(ingredientsSecondBundle, null, 4),
        (error) => {
          if (error) {
            throw new Error(error);
          }
        },
      );
    });
  axios
    .get(
      'https://shop.mindfulchef.com/collections/smoothies/products/strawberry-goji-smoothie-pack-of-5',
    )
    .then((res) => {
      const $ = cheerio.load(res.data);

      ingredientsSecondBundle[5].description = $('.product-description')
        .last('p')
        .last('span')
        .text()
        .replace(/\s\s+/g, '')
        .split('\n')[0];
    })
    .then(() => {
      fs.writeFile(
        './data/ingredientsSecondBundle.json',
        JSON.stringify(ingredientsSecondBundle, null, 4),
        (error) => {
          if (error) {
            throw new Error(error);
          }
        },
      );
    });
};

// prepareSecondIngredientsData();
// prepareSecondIngredientsDescription();

const ingredientsThirdBundle = [
  {
    name: '',
    image: '',
    description: '',
    status: '',
    category: '',
    price: 0,
    countInStock: 0,
    rating: 0,
    numReviews: 0,
  },
  {
    name: '',
    image: '',
    description: '',
    status: '',
    category: '',
    price: 0,
    countInStock: 0,
    rating: 0,
    numReviews: 0,
  },
  {
    name: '',
    image: '',
    description: '',
    status: '',
    category: '',
    price: 0,
    countInStock: 0,
    rating: 0,
    numReviews: 0,
  },
  {
    name: '',
    image: '',
    description: '',
    status: '',
    category: '',
    price: 0,
    countInStock: 0,
    rating: 0,
    numReviews: 0,
  },
  {
    name: '',
    image: '',
    description: '',
    status: '',
    category: '',
    price: 0,
    countInStock: 0,
    rating: 0,
    numReviews: 0,
  },
  {
    name: '',
    image: '',
    description: '',
    status: '',
    category: '',
    price: 0,
    countInStock: 0,
    rating: 0,
    numReviews: 0,
  },
];

const prepareThirdIngredientsData = () => {
  axios
    .get('https://shop.mindfulchef.com/collections/gift-vouchers')
    .then((res) => {
      const $ = cheerio.load(res.data);

      $('.grid__item')
        .find('.product-grid--title')
        .each((index, element) => {
          if (index < 6) {
            ingredientsThirdBundle[index].name = $(element).text().replace(/\s\s+/g, '');
          }
        });

      $('.grid__item')
        .find('.lazyload-blur-wrapper')
        .each((index, element) => {
          if (index < 6) {
            const link = $(element).children('img').attr('src').replace(/150x/g, '1000x1000');
            if (link.includes('products')) {
              ingredientsThirdBundle[index].image = link;
            }
            if (link.includes('products')) {
              ingredientsThirdBundle[index].category = link
                .split('/products/')
                .pop()
                .split('_1000x1000')[0]
                .replace(/_/g, ' ')
                .toUpperCase();
            }
          }
        });

      $('.grid__item')
        .find('.pricing-unit')
        .children('span')
        .each((index, element) => {
          if (index < 6) {
            ingredientsThirdBundle[index].price = $(element)
              .text()
              .replace(/\s\s+/g, '')
              .replace(/Regular price/g, '')
              .replace(/Sale price/g, '')
              .replace(/\s\s+/g, '');
            if (!ingredientsThirdBundle[index].price) {
              ingredientsThirdBundle[index].price = 9.99;
            }
          }
        });
    })
    .then(() => {
      fs.writeFile(
        './data/ingredientsThirdBundle.json',
        JSON.stringify(ingredientsThirdBundle, null, 4),
        (error) => {
          if (error) {
            throw new Error(error);
          }
        },
      );
    });
};

const prepareThirdIngredientsDescription = () => {
  axios
    .get('https://shop.mindfulchef.com/collections/gift-vouchers/products/30-recipe-box-gift-card')
    .then((res) => {
      const $ = cheerio.load(res.data);

      ingredientsThirdBundle[0].description = $('.product-description')
        .last('p')
        .last('span')
        .text()
        .replace(/\s\s+/g, '')
        .split('\n')[0];
    })
    .then(() => {
      fs.writeFile(
        './data/ingredientsThirdBundle.json',
        JSON.stringify(ingredientsThirdBundle, null, 4),
        (error) => {
          if (error) {
            throw new Error(error);
          }
        },
      );
    });

  axios
    .get(
      'https://shop.mindfulchef.com/collections/gift-vouchers/products/60-recipe-box-gift-voucher-just-49-99',
    )
    .then((res) => {
      const $ = cheerio.load(res.data);

      ingredientsThirdBundle[1].description = $('.product-description')
        .last('p')
        .last('span')
        .text()
        .replace(/\s\s+/g, '')
        .split('\n')[0];
    })
    .then(() => {
      fs.writeFile(
        './data/ingredientsThirdBundle.json',
        JSON.stringify(ingredientsThirdBundle, null, 4),
        (error) => {
          if (error) {
            throw new Error(error);
          }
        },
      );
    });
  axios
    .get(
      'https://shop.mindfulchef.com/collections/gift-vouchers/products/100-recipe-box-gift-voucher-just-84-99',
    )
    .then((res) => {
      const $ = cheerio.load(res.data);

      ingredientsThirdBundle[2].description = $('.product-description')
        .last('p')
        .last('span')
        .text()
        .replace(/\s\s+/g, '')
        .split('\n')[0];
    })
    .then(() => {
      fs.writeFile(
        './data/ingredientsThirdBundle.json',
        JSON.stringify(ingredientsThirdBundle, null, 4),
        (error) => {
          if (error) {
            throw new Error(error);
          }
        },
      );
    });
  axios
    .get(
      'https://shop.mindfulchef.com/collections/gift-vouchers/products/30-frozen-meal-smoothies-gift-card',
    )
    .then((res) => {
      const $ = cheerio.load(res.data);

      ingredientsThirdBundle[3].description = $('.product-description')
        .last('p')
        .last('span')
        .text()
        .replace(/\s\s+/g, '')
        .split('\n')[0];
    })
    .then(() => {
      fs.writeFile(
        './data/ingredientsThirdBundle.json',
        JSON.stringify(ingredientsThirdBundle, null, 4),
        (error) => {
          if (error) {
            throw new Error(error);
          }
        },
      );
    });
  axios
    .get(
      'https://shop.mindfulchef.com/collections/gift-vouchers/products/60-frozen-smoothies-gift-card',
    )
    .then((res) => {
      const $ = cheerio.load(res.data);

      ingredientsThirdBundle[4].description = $('.product-description')
        .last('p')
        .last('span')
        .text()
        .replace(/\s\s+/g, '')
        .split('\n')[0];
    })
    .then(() => {
      fs.writeFile(
        './data/ingredientsThirdBundle.json',
        JSON.stringify(ingredientsThirdBundle, null, 4),
        (error) => {
          if (error) {
            throw new Error(error);
          }
        },
      );
    });
  axios
    .get(
      'https://shop.mindfulchef.com/collections/gift-vouchers/products/500-recipe-box-gift-voucher-just-449',
    )
    .then((res) => {
      const $ = cheerio.load(res.data);

      ingredientsThirdBundle[5].description = $('.product-description')
        .last('p')
        .last('span')
        .text()
        .replace(/\s\s+/g, '')
        .split('\n')[0];
    })
    .then(() => {
      fs.writeFile(
        './data/ingredientsThirdBundle.json',
        JSON.stringify(ingredientsThirdBundle, null, 4),
        (error) => {
          if (error) {
            throw new Error(error);
          }
        },
      );
    });
};

prepareThirdIngredientsData();
prepareThirdIngredientsDescription();
