import { useEffect, useState } from "react";
import NAVB from "../layout/NAV"
import Star from "../components/forms/Star"
import { fetchProductsByFilter, getProductsByCount} from "../components/functions/product";
import {
    DollarOutlined,
    DownSquareOutlined,
    StarOutlined,
} from "@ant-design/icons";
import { Menu, Slider, Checkbox, Radio } from "antd";
import {Container , Row , Col , Card , CardBody}  from "reactstrap"
import { useDispatch, useSelector } from "react-redux";
import ProductCard from "../cards/ProductCard";
import { getCategories } from "../components/functions/category";
import { getSubs } from "../components/functions/SubCategory";
import Default from "../images/Default.png"
import Layout from "../layout/Layout";
import { FaRupeeSign } from "react-icons/fa"
import Seo from "../components/seo";

const { SubMenu, ItemGroup } = Menu;
const Shop = () =>{
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [price, setPrice] = useState([0, 0]);
    const [ok, setOk] = useState(false);
    const [categories, setCategories] = useState([]);
    const [categoryIds, setCategoryIds] = useState([]);
    const [star, setStar] = useState("");
    const [subs, setSubs] = useState([]);
    const [sub, setSub] = useState("");
    const [brands, setBrands] = useState([
        "Kent", 
        "3M", 
        "Grundfos", 
        "IonExchange"
    ]);
    const [brand, setBrand] = useState("");
    const [colors, setColors] = useState([
      "Black",
      "Brown",
      "Silver",
      "White",
      "Blue",
    ]);
    const [color, setColor] = useState("");
    const [shipping, setShipping] = useState("");
  
    let dispatch = useDispatch();
    let { search } = useSelector((state) => ({ ...state }));
    const { text } = search;
  
    useEffect(() => {
      loadAllProducts();
      // fetch categories
      getCategories().then((res) => setCategories(res.data));
      // fetch subcategories
      getSubs().then((res) => setSubs(res.data));
    }, []);
  
    const fetchProducts = (arg) => {
      fetchProductsByFilter(arg).then((res) => {
        setProducts(res.data);
      });
    };
  
    // 1. load products by default on page load
    const loadAllProducts = () => {
      getProductsByCount(12).then((p) => {
        setProducts(p.data);
        setLoading(false);
      });
    };
  
    // 2. load products on user search input
    useEffect(() => {
      const delayed = setTimeout(() => {
        fetchProducts({ query: text });
        if (!text) {
          loadAllProducts();
        }
      }, 300);
      return () => clearTimeout(delayed);
    }, [text]);
  
    // 3. load products based on price range
    useEffect(() => {
      console.log("ok to request");
      fetchProducts({ price });
    }, [ok]);
  
    const handleSlider = (value) => {
      dispatch({
        type: "SEARCH_QUERY",
        payload: { text: "" },
      });
  
      // reset
      setCategoryIds([]);
      setPrice(value);
      setStar("");
      setSub("");
      setBrand("");
      setColor("");
      setShipping("");
      setTimeout(() => {
        setOk(!ok);
      }, 300);
    };
  
    // 4. load products based on category
    // show categories in a list of checkbox
    const showCategories = () =>
      categories.map((c) => (
        <div key={c._id}>
          <Checkbox
            onChange={handleCheck}
            className="pb-2 pl-4 pr-4"
            value={c._id}
            name="category"
            checked={categoryIds.includes(c._id)}
          >
            {c.name}
          </Checkbox>
          <br />
        </div>
      ));
  
    // handle check for categories
    const handleCheck = (e) => {
      // reset
      dispatch({
        type: "SEARCH_QUERY",
        payload: { text: "" },
      });
      setPrice([0, 0]);
      setStar("");
      setSub("");
      setBrand("");
      setColor("");
      setShipping("");
      // console.log(e.target.value);
      let inTheState = [...categoryIds];
      let justChecked = e.target.value;
      let foundInTheState = inTheState.indexOf(justChecked); // index or -1
  
      // indexOf method ?? if not found returns -1 else return index [1,2,3,4,5]
      if (foundInTheState === -1) {
        inTheState.push(justChecked);
      } else {
        // if found pull out one item from index
        inTheState.splice(foundInTheState, 1);
      }
  
      setCategoryIds(inTheState);
      // console.log(inTheState);
      fetchProducts({ category: inTheState });
    };
  
    // 5. show products by star rating
    const handleStarClick = (num) => {
      // console.log(num);
      dispatch({
        type: "SEARCH_QUERY",
        payload: { text: "" },
      });
      setPrice([0, 0]);
      setCategoryIds([]);
      setStar(num);
      setSub("");
      setBrand("");
      setColor("");
      setShipping("");
      fetchProducts({ stars: num });
    };
  
    const showStars = () => (
      <div className="pr-4 pl-4 pb-2">
        <Star starClick={handleStarClick} numberOfStars={5} />
        <Star starClick={handleStarClick} numberOfStars={4} />
        <Star starClick={handleStarClick} numberOfStars={3} />
        <Star starClick={handleStarClick} numberOfStars={2} />
        <Star starClick={handleStarClick} numberOfStars={1} />
      </div>
    );
  
    // 6. show products by sub category
    const showSubs = () =>
      subs.map((s) => (
        <h4
          key={s._id}
          onClick={() => handleSub(s)}
          className="p-1 m-1 badge badge-secondary text-black"
          style={{ cursor: "pointer" ,fontSize:"14px" }}
        >
          {s.name}
        </h4>
      ));
  
    const handleSub = (sub) => {
      // console.log("SUB", sub);
      setSub(sub);
      dispatch({
        type: "SEARCH_QUERY",
        payload: { text: "" },
      });
      setPrice([0, 0]);
      setCategoryIds([]);
      setStar("");
      setBrand("");
      setColor("");
      setShipping("");
      fetchProducts({ sub });
    };
  
    // 7. show products based on brand name
    const showBrands = () =>
      brands.map((b) => (
        <Radio
          key={b}
          value={b}
          name={b}
          checked={b === brand}
          onChange={handleBrand}
          className="pb-1 pl-4 pr-4"
        >
          {b}
        </Radio>
      ));
  
    const handleBrand = (e) => {
      setSub("");
      dispatch({
        type: "SEARCH_QUERY",
        payload: { text: "" },
      });
      setPrice([0, 0]);
      setCategoryIds([]);
      setStar("");
      setColor("");
      setBrand(e.target.value);
      setShipping("");
      fetchProducts({ brand: e.target.value });
    };
  
    // 8. show products based on color
    const showColors = () =>
      colors.map((c) => (
        <Radio
          key={c}
          value={c}
          name={c}
          checked={c === color}
          onChange={handleColor}
          className="pb-1 pl-4 pr-4"
        >
          {c}
        </Radio>
      ));
  
    const handleColor = (e) => {
      setSub("");
      dispatch({
        type: "SEARCH_QUERY",
        payload: { text: "" },
      });
      setPrice([0, 0]);
      setCategoryIds([]);
      setStar("");
      setBrand("");
      setColor(e.target.value);
      setShipping("");
      fetchProducts({ color: e.target.value });
    };
  
    // 9. show products based on shipping yes/no
    const showShipping = () => (
      <>
        <Checkbox
          className="pb-2 pl-4 pr-4"
          onChange={handleShippingchange}
          value="Yes"
          checked={shipping === "Yes"}
        >
          Yes
        </Checkbox>
  
        <Checkbox
          className="pb-2 pl-4 pr-4"
          onChange={handleShippingchange}
          value="No"
          checked={shipping === "No"}
        >
          No
        </Checkbox>
      </>
    );
  
    const handleShippingchange = (e) => {
      setSub("");
      dispatch({
        type: "SEARCH_QUERY",
        payload: { text: "" },
      });
      setPrice([0, 0]);
      setCategoryIds([]);
      setStar("");
      setBrand("");
      setColor("");
      setShipping(e.target.value);
      fetchProducts({ shipping: e.target.value });
    };

    const style={
        backgroundColor:"#051937",
        color:"white",
        fontFamily:"Montserrat",
        Text:{
        fontFamily:"Montserrat",
        color:"black"
        },
        TitleText:{
            fontFamily:"Montserrat",
            color:"white"
            }
        }


return(
    <>
    <Seo
    title={`Aquakart Shop with Best Filters ever | Aquakart.Store`}
    description={`Here you can choose your product with custom filters with your need optimised with wide range of varieties of products are added here with great discounts with immediate delivery.`}
    keywords={`Aquakart Shop with various products List , Grundfos , Kent , Liquiclear , Ao Smith`}
    image={`https://aquakart.store/static/media/Default.9c4634fa.png`}
    />
    <div>
    <Layout>
      <Container fluid>
      <Card style={style}>
          <CardBody>
            <Row>
            <Col md={2}>
            <h2 style={style.TitleText}>Filters</h2>
            <hr/>
            <Menu
            defaultOpenKeys={["1", "2", "3", "4", "5", "6", "7"]}
            mode="inline"
          >
            <Container className="p-3">
            {/* price */}
            <SubMenu
              key="1"
              title={
                <span className="h6">
                <FaRupeeSign/>   Price
                </span>
              }
            >
              <div>
                <Slider
                  className="ml-4 mr-4"
                  tipFormatter={(v) => `???${v}`}
                  range
                  value={price}
                  onChange={handleSlider}
                  max="4999"
                />
              </div>
            </SubMenu>

            {/* category */}
            <SubMenu
              key="2"
              title={
                <span className="h6">
                  <DownSquareOutlined /> Categories
                </span>
              }
            >
              <div style={{ maringTop: "-10px" }}>{showCategories()}</div>
            </SubMenu>

            {/* stars */}
            <SubMenu
              key="3"
              title={
                <span className="h6">
                  <StarOutlined /> Rating
                </span>
              }
            >
              <div style={{ maringTop: "-10px"}}>{showStars()}</div>
            </SubMenu>

            {/* sub category */}
            <SubMenu
              key="4"
              title={
                <span className="h6">
                  <DownSquareOutlined /> Sub Categories
                </span>
              }
            >
              <div style={{ maringTop: "-10px" }} className="pl-4 pr-4">
                {showSubs()}
              </div>
            </SubMenu>

            {/* brands */}
            <SubMenu
              key="5"
              title={
                <span className="h6">
                  <DownSquareOutlined /> Brands
                </span>
              }
            >
              <div style={{ maringTop: "-10px" }} className="pr-5">
                {showBrands()}
              </div>
            </SubMenu>

            {/* colors */}
            <SubMenu
              key="6"
              title={
                <span className="h6">
                  <DownSquareOutlined /> Colors
                </span>
              }
            >
              <div style={{ maringTop: "-10px" }} className="pr-5">
                {showColors()}
              </div>
            </SubMenu>

            {/* shipping */}
            <SubMenu
              key="7"
              title={
                <span className="h6">
                  <DownSquareOutlined /> Shipping
                </span>
              }
            >
              <div style={{ maringTop: "-10px" }} className="pr-5">
                {showShipping()}
              </div>
            </SubMenu>
            </Container>
          </Menu>                
                  </Col>
                  <Col md={10}>
                  <h2 style={style.TitleText}>Products</h2>
                  <hr/>
                  <Row>
                    {products.map((p)=>(
                        <Col key={p._id} md={4} className="mb-1">
                        <ProductCard product={p}/>
                        </Col>
                    ))}
                    </Row>
                  </Col>
             </Row>
          </CardBody>
      </Card>
      </Container>
    </Layout>
    </div>
    </>
)
}
export default Shop