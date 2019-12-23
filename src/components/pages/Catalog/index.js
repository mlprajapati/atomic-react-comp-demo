import React, { Component } from "react";
import styled from "styled-components";
import { palette } from "styled-tools";
import { Tabs, Tab } from "react-bootstrap";
import { ItemList, SimplePagination } from "../../../components";
const StyledTabs = styled(Tabs)`
  background-color: ${palette("grayscale", 8, true)};
  .nav,
  .nav-tabs,
  .nav-link {
    width: calc(50% - 40px);
    margin: 0px 20px;
    color: ${palette("white", 0, true)};
    text-align: center;
    margin-bottom: 4px;
    border-bottom-color: ${palette("grayscale", 8, true)};
    border-top-left-radius: 0;
    border-top-right-radius: 0;
    :hover {
      border: 0px solid transparent;
      border-bottom: 2px solid ${palette("white", 0, true)};
      color: ${palette("grayscale", 6, true)};
    }
    &.active {
      border: 0px solid transparent;
      border-bottom: 2px solid ${palette("white", 0, true)};
      background-color: ${palette("grayscale", 8, true)} !important;
      color: #ccc;
    }
  }
`;
const StyledSimplePagination = styled(SimplePagination)`
  ul .pagination {
    background-color: red;
  }
`;
let details = {};
let itemList = [];
let categoryList = [];
class Catalog extends Component {
  state = {
    filterBy: "floor",
    currentPageNumber: 1,
    totalPages: 1,
    numItemsPerPage: 8,
    totalItems: [],
    currentItemTitle: "",
    currentPageItems: []
  };
  resize = () => {
    let width = window.innerWidth;
    if (width <= 767) {
      this.setState({ numItemsPerPage: 8 });
    } else if (width > 767 && width < 1024) {
      this.setState({ numItemsPerPage: 9 });
    } else {
      this.setState({ numItemsPerPage: 8 });
    }
    this.initData(this.state.filterBy, this.state.currentPageNumber);
  };

  componentWillUnmount() {
    window.removeEventListener("resize", this.resize);
    this.setState = (state, callback) => {
      return;
    };
  }
  itemClick = item => {
    this.setState({ currentItemTitle: item.title });
    if (this.state.filterBy === "shelf") {
      this.props.history.push("/item-details", { item });
    }
  };
  addToCartClick = details => {
    console.log("addToCartClicked.......", details);
  };
  paginate = (array, page_size, page_number) => {
    --page_number;
    console.log(array, page_size, page_number);
    return array.slice(page_number * page_size, (page_number + 1) * page_size);
  };

  initData = async (filterby, currentPageNumber) => {
    let listItem = filterby === "shelf" ? itemList : categoryList;
    this.setState({ currentPageNumber: currentPageNumber });
    this.setState({
      totalItems: listItem
    });
    let totalPages = Math.ceil(listItem.length / this.state.numItemsPerPage);
    this.setState({ totalPages: totalPages });
    await this.setState({
      currentPageItems: this.paginate(
        listItem,
        this.state.numItemsPerPage,
        currentPageNumber
      )
    });
    this.setState({ currentItemTitle: "" });
  };
  componentDidMount = () => {
    details = {
      title: "Lays Barbeque",
      code: "0122100",
      imgsrc: "/assets/images/img0.png",
      desc:
        "The DORITOS® brand is all about boldness. If you’re up to the challenge, grab a bag of DORITOS® tortilla chips and get ready to make some memories you won’t soon forget. It’s a bold experience in snacking and beyond.",
      status: 100,
      quantity: 100,
      type: "shelf",
      thumbimgsrc: "/assets/images/img0.png",
      imggallery: ["/assets/images/img0.png", "/assets/images/img0.png"]
    };

    itemList = [
      {
        itemDetails: details
      },
      {
        itemDetails: {
          title: "Lays Classic",
          code: "0122101",
          imgsrc: "/assets/images/img1.png",
          desc:
            "Wherever celebrations and good times happen, the LAY'S® brand will be there just as it has been for more than 75 years. With flavors almost as rich as our history, we have a chip or crisp flavor guaranteed to bring a smile on your face.",
          status: 40,
          quantity: 80,
          type: "shelf",
          thumbimgsrc: "/assets/images/img1.png",
          imggallery: ["/assets/images/img1.png", "/assets/images/img1.png"]
        }
      },
      {
        itemDetails: {
          title: "Stacy",
          code: "0122102",
          imgsrc: "/assets/images/img2.png",
          desc:
            "STACY’S® pita chips and thins, real pita bread twice baked for incredible crunch. ",
          status: 0,
          quantity: 0,
          type: "shelf",
          thumbimgsrc: "/assets/images/img2.png",
          imggallery: ["/assets/images/img2.png", "/assets/images/img2.png"]
        }
      },
      {
        itemDetails: {
          title: "Off The Eaten Path",
          code: "0122103",
          imgsrc: "/assets/images/img3.png",
          desc:
            "Hungry for a new adventure? Try Off the Eaten Path – deliciously different from chips. You’ll discover a new take on Real Veggies like green peas, yellow peas and black beans. Keep feeding your curious!",
          status: 80,
          quantity: 80,
          type: "shelf",
          thumbimgsrc: "/assets/images/img3.png",
          imggallery: ["/assets/images/img3.png", "/assets/images/img3.png"]
        }
      },
      {
        itemDetails: {
          title: "Pepsi",
          code: "0122104",
          imgsrc: "/assets/images/img4.png",
          desc: "Delicious. Refreshing. Pepsi",
          status: 33,
          quantity: 20,
          type: "shelf",
          thumbimgsrc: "/assets/images/img4.png",
          imggallery: ["/assets/images/img4.png", "/assets/images/img4.png"]
        }
      },
      {
        itemDetails: {
          title: "Mirinda",
          code: "0122105",
          imgsrc: "/assets/images/img5.png",
          desc:
            "Mirinda is a fun brand that captures love for fruity flavors through vibrant, delicious fruity offerings. With over 44+ flavors globally, Mirinda is a billion dollar PepsiCo brand with presence in over 100 countries.",
          status: 80,
          quantity: 90,
          type: "shelf",
          thumbimgsrc: "/assets/images/img5.png",
          imggallery: ["/assets/images/img5.png", "/assets/images/img5.png"]
        }
      },
      {
        itemDetails: {
          title: "Diet Mountain Dew",
          code: "0122106",
          imgsrc: "/assets/images/img6.png",
          desc:
            "All the great, exhilarating taste of MTN DEW with zero calories.",
          status: 70,
          quantity: 90,
          type: "shelf",
          thumbimgsrc: "/assets/images/img6.png",
          imggallery: ["/assets/images/img6.png", "/assets/images/img6.png"]
        }
      },
      {
        itemDetails: {
          title: "Pure Leaf",
          code: "0122107",
          imgsrc: "/assets/images/img7.png",
          desc:
            "Pure Leaf brews premium iced tea from real tea leaves and follows a simple and authentic  process that comes from a passion for realness.",
          status: 20,
          quantity: 40,
          type: "shelf",
          thumbimgsrc: "/assets/images/img7.png",
          imggallery: ["/assets/images/img7.png", "/assets/images/img7.png"]
        }
      },
      {
        itemDetails: {
          title: "Ruffles",
          code: "0122108",
          imgsrc: "/assets/images/img8.png",
          desc:
            "With crunchy ridges and epic inspired flavors, RUFFLES® potato chips bring snack satisfaction and big taste to any moment.",
          status: 43,
          quantity: 72,
          type: "shelf",
          thumbimgsrc: "/assets/images/img8.png",
          imggallery: ["/assets/images/img8.png", "/assets/images/img8.png"]
        }
      },
      {
        itemDetails: {
          title: "Sabra",
          code: "0122109",
          imgsrc: "/assets/images/img9.png",
          desc:
            "Sabra makes America’s favorite hummus in more than a dozen delicious varieties. All of Sabra’s products are made with fresh ingredients you can feel good about, including plant-based foods that are non-GMO, vegan, gluten-free, kosher, and organic.",
          status: 25,
          quantity: 50,
          type: "shelf",
          thumbimgsrc: "/assets/images/img9.png",
          imggallery: ["/assets/images/img9.png", "/assets/images/img9.png"]
        }
      },
      {
        itemDetails: {
          title: "Smartfood Delight",
          code: "0122110",
          imgsrc: "/assets/images/img10.png",
          desc:
            "As America’s favorite popcorn brand, our fresh-tasting, light-textured SMARTFOOD DELIGHT® varieties always seem to keep the fun popping with only 35 calories per cup. In our book, being smart is always in great taste.",
          status: 50,
          quantity: 100,
          type: "shelf",
          thumbimgsrc: "/assets/images/img10.png",
          imggallery: ["/assets/images/img10.png", "/assets/images/img10.png"]
        }
      },
      {
        itemDetails: {
          title: "Quaker",
          code: "0122111",
          imgsrc: "/assets/images/img11.png",
          desc:
            "For more than 140 years, Quaker has been the leading expert in oats, combining science, scale, passion, and expertise, and dedicated to determining ways to transform the oat into products that help people benefit from their goodness.",
          status: 100,
          quantity: 30,
          type: "shelf",
          thumbimgsrc: "/assets/images/img11.png",
          imggallery: ["/assets/images/img11.png", "/assets/images/img11.png"]
        }
      },
      {
        itemDetails: {
          title: "Tostitos",
          code: "0122112",
          imgsrc: "/assets/images/img12.png",
          desc:
            "TOSTITOS® are more than tortilla chips and dips – they’re an invitation to catch up with friends, so Get Together Already™!",
          status: 33,
          quantity: 60,
          type: "shelf",
          thumbimgsrc: "/assets/images/img12.png",
          imggallery: ["/assets/images/img12.png", "/assets/images/img12.png"]
        }
      },
      {
        itemDetails: {
          title: "Funyuns",
          code: "0122113",
          imgsrc: "/assets/images/img13.png",
          desc:
            "FUNYUNS® Onion Flavored Rings are a deliciously different snack that’s fun to eat, with a crisp texture and zesty onion flavor. Next time you're in the mood for a tasty treat that's out of the ordinary, try FUNYUNS® Onion Flavored Rings.",
          status: 80,
          quantity: 80,
          type: "shelf",
          thumbimgsrc: "/assets/images/img13.png",
          imggallery: ["/assets/images/img13.png", "/assets/images/img13.png"]
        }
      },
      {
        itemDetails: {
          title: "Fritos",
          code: "0122114",
          imgsrc: "/assets/images/img14.png",
          desc:
            "The popularity of FRITOS® corn chips puts this iconic snack in a class of its own. From small towns and family barbecues to parties in the big city, this classic snack is still satisfying fans after more than 80 years.",
          status: 90,
          quantity: 70,
          type: "shelf",
          thumbimgsrc: "/assets/images/img14.png",
          imggallery: ["/assets/images/img14.png", "/assets/images/img14.png"]
        }
      },
      {
        itemDetails: {
          title: "Starbucks",
          code: "0122115",
          imgsrc: "/assets/images/img15.png",
          desc:
            "More than twenty years ago, Starbucks and PepsiCo started the North America Coffee Partnership and launched Starbucks Bottled Frappuccino chilled coffee drink. What started out as a nascent category has grown to be more than 40 ready-to-drink Starbucks beverages and more than $2 billion in retail business.",
          status: 10,
          quantity: 80,
          type: "shelf",
          thumbimgsrc: "/assets/images/img15.png",
          imggallery: ["/assets/images/img14.png", "/assets/images/img15.png"]
        }
      }
    ];

    categoryList = [
      {
        itemDetails: {
          title: "LEVEL 1 - EAST",
          code: "15 METER AWAY",
          imgsrc: "/assets/images/cat1.png",
          desc: "test ",
          status: 80,
          quantity: 100,
          type: "floor",
          thumbimgsrc: "/assets/images/cat1.png",
          imggallery: ["/assets/images/cat1.png", "/assets/images/cat1.png"]
        }
      },
      {
        itemDetails: {
          title: "LEVEL 2 - EAST",
          code: "5 METER AWAY",
          imgsrc: "/assets/images/cat2.png",
          desc: "test ",
          status: 33,
          quantity: 60,
          type: "floor",
          thumbimgsrc: "/assets/images/cat2.png",
          imggallery: ["/assets/images/cat2.png", "/assets/images/cat2.png"]
        }
      },
      {
        itemDetails: {
          title: "LEVEL 3 - WEST",
          code: "10 METER AWAY",
          imgsrc: "/assets/images/cat3.png",
          desc: "test ",
          status: 80,
          quantity: 66,
          type: "floor",
          thumbimgsrc: "/assets/images/cat3.png",
          imggallery: ["/assets/images/cat3.png", "/assets/images/cat3.png"]
        }
      },
      {
        itemDetails: {
          title: "LEVEL 4 - EAST",
          code: "5 METER AWAY",
          imgsrc: "/assets/images/cat4.png",
          desc: "test ",
          status: 33,
          quantity: 57,
          type: "floor",
          thumbimgsrc: "/assets/images/cat4.png",
          imggallery: ["/assets/images/cat4.png", "/assets/images/cat4.png"]
        }
      },
      {
        itemDetails: {
          title: "LEVEL 5 - WEST",
          code: "1 METER AWAY",
          imgsrc: "/assets/images/cat5.png",
          desc: "test ",
          status: 80,
          quantity: 12,
          type: "floor",
          thumbimgsrc: "/assets/images/cat5.png",
          imggallery: ["/assets/images/cat5.png", "/assets/images/cat5.png"]
        }
      },
      {
        itemDetails: {
          title: "LEVEL 6 - NORTH",
          code: "0 METER AWAY",
          imgsrc: "/assets/images/cat6.png",
          desc: "test ",
          status: 33,
          quantity: 99,
          type: "floor",
          thumbimgsrc: "/assets/images/cat6.png",
          imggallery: ["/assets/images/cat6.png", "/assets/images/cat6.png"]
        }
      }
    ];
    this.resize();
    window.addEventListener("resize", this.resize);
  };

  onSelectPagination = number => {
    console.log("..................... ", number);
    if (number > 0 && number <= this.state.totalPages) {
      this.setState({ currentPageNumber: number });
      this.setState({
        currentPageItems: this.paginate(
          this.state.totalItems,
          this.state.numItemsPerPage,
          number
        )
      });
    } else {
      this.setState({ currentPageNumber: this.state.currentPageNumber });
    }
  };
  render() {
    console.log("sdf", this.state.currentPageItems.length);
    return (
      <StyledTabs
        defaultActiveKey="floor"
        id="uncontrolled-tab-example"
        onSelect={(index, label) => {
          this.setState({ filterBy: index });
          console.log(index, " : ", label + " selected");
          this.initData(index, 1);
        }}
      >
        <Tab eventKey="floor" title="FLOOR">
          <SimplePagination
            style={{
              backgroundColor: "#e0e0e0",
              padding: "10px 15px",
              marginBottom: 0
            }}
            onSelectPagination={this.onSelectPagination}
            currentPageNumber={this.state.currentPageNumber}
            items={this.state.totalPages}
            title={this.state.currentItemTitle}
            totalPages={this.state.totalPages}
          />
          {this.state.currentPageItems.length > 0 && (
            <ItemList
              itemList={this.state.currentPageItems}
              btnTransparent={true}
              btnReverse={false}
              btnPalette="success"
              itemClick={this.itemClick}
              addToCartClick={this.addToCartClick}
            />
          )}
        </Tab>
        <Tab eventKey="shelf" title="SHELF">
          <StyledSimplePagination
            style={{
              backgroundColor: "#e0e0e0",
              padding: "10px 15px",
              marginBottom: 0
            }}
            onSelectPagination={this.onSelectPagination}
            currentPageNumber={this.state.currentPageNumber}
            items={this.state.totalPages}
            title={this.state.currentItemTitle}
            totalPages={this.state.totalPages}
          />
          {this.state.currentPageItems.length > 0 && (
            <ItemList
              itemList={this.state.currentPageItems}
              btnTransparent={true}
              btnReverse={false}
              btnPalette="success"
              itemClick={this.itemClick}
              addToCartClick={this.addToCartClick}
            />
          )}
        </Tab>
      </StyledTabs>
    );
  }
}

export default Catalog;
