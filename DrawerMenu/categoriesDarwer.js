import {WomenCategoriesProducts} from "./categoriesData/womenTurkeyProducts";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import {AiOutlineMinus} from "react-icons/ai";
import {BsPlus} from "react-icons/bs";
import Collapse from "@material-ui/core/Collapse";
import Link from "next/link";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import {menProducts} from "./categoriesData/menProducts";
import {kidsProducts} from "./categoriesData/kidsProducts";
import {WomenAccessoriesProducts} from "./categoriesData/womenAccessoriesProducts";
import {menAccessoriesProducts} from "./categoriesData/menAccessoriesProducts";
import {kidsAccessoriesProducts} from "./categoriesData/kidsAccessoriesProducts";
import {otherProducts} from "./categoriesData/otherProducts";


export const WomenTurkeyProducts = (
    <>
        {WomenCategoriesProducts.map(category => (
            <List component="div"
                  disablePadding
            >
                <ListItem button
                          onClick={handleOpenWomenTurkeyProducts}
                >
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            width: "100%"
                        }}
                    >
                        <span> {category.title} </span>
                        {openWomenTurkeyProducts ?
                            <AiOutlineMinus/> :
                            <BsPlus/>}
                    </div>
                </ListItem>
                <Collapse in={openWomenTurkeyProducts}
                          timeout="auto"
                          unmountOnExit
                >
                    {category.productsData.map(data => (
                        <List component="div"
                              disablePadding
                        >
                            <Link href={data.link}>
                                <ListItem button>
                                    <ListItemIcon>
                                        <span>{data.title}</span>
                                    </ListItemIcon>
                                </ListItem>
                            </Link>
                        </List>
                    ))}

                </Collapse>
            </List>
        ))}
    </>
);

export const MenProducts = (
    <>
        {menProducts.map(category => (
            <List>
                <ListItem button
                          onClick={handleOpenMenProducts}
                >
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            width: "100%"
                        }}
                    >
                        <span>{category.title}</span>
                        {openMenProducts ?
                            <AiOutlineMinus/> :
                            <BsPlus/>}
                    </div>
                </ListItem>
                <Collapse in={openMenProducts}
                          timeout="auto"
                          unmountOnExit
                >
                    {category.productsData.map(data => (
                        <Link href={data.link}>
                            <ListItem button>
                                <ListItemIcon>
                                    <span>{data.title}</span>
                                </ListItemIcon>
                            </ListItem>
                        </Link>
                    ))}
                </Collapse>
            </List>
        ))}
    </>
)

export const KidsProducts = (
    <>
        {kidsProducts.map(category => (
            <List>
                <ListItem button
                          onClick={handleOpenKidsProducts}
                >
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            width: "100%"
                        }}
                    >
                        <span>{category.title}</span>
                        {openKidsProducts ?
                            <AiOutlineMinus/> :
                            <BsPlus/>}
                    </div>
                </ListItem>
                <Collapse in={openKidsProducts}
                          timeout="auto"
                          unmountOnExit
                >
                    {category.productsData.map(data => (
                        <Link href={data.link}>
                            <ListItem button>
                                <ListItemIcon>
                                    <span>{data.title}</span>
                                </ListItemIcon>
                            </ListItem>
                        </Link>
                    ))}
                </Collapse>
            </List>
        ))}
    </>
)

export const WomenAccessories = (
    <>
        {WomenAccessoriesProducts.map(
            category => (
                <List component="div"
                      disablePadding
                >
                    <ListItem button
                              onClick={handleOpenWomenAccessories}
                    >
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                width: "100%"
                            }}
                        >
                            <span> {category.title} </span>
                            {openWomenAccessories ?
                                <AiOutlineMinus/> :
                                <BsPlus/>}
                        </div>
                    </ListItem>
                    <Collapse in={openWomenAccessories}
                              timeout="auto"
                              unmountOnExit
                    >
                        <List component="div"
                              disablePadding
                        >
                            {category.productsData.map(data => (
                                <Link href={data.link}>
                                    <ListItem button>
                                        <ListItemIcon>
                                            <span>{data.title}</span>
                                        </ListItemIcon>
                                    </ListItem>
                                </Link>
                            ))}
                        </List>
                    </Collapse>
                </List>
            )
        )}
    </>
);

export const MenAccessories = (
    <>
        {menAccessoriesProducts.map(category => (
            <List component="div"
                  disablePadding
            >
                <ListItem button
                          onClick={handleOpenMenAccessories}
                >
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            width: "100%"
                        }}
                    >
                        <span> {category.title} </span>
                        {openMenAccessories ?
                            <AiOutlineMinus/> :
                            <BsPlus/>}
                    </div>
                </ListItem>
                <Collapse in={openMenAccessories}
                          timeout="auto"
                          unmountOnExit
                >
                    {category.productsData.map(
                        data => (
                            <List component="div"
                                  disablePadding
                            >
                                <Link href={data.link}>
                                    <ListItem button>
                                        <ListItemIcon>
                                            <span>{data.title}</span>
                                        </ListItemIcon>
                                    </ListItem>
                                </Link>
                            </List>
                        )
                    )}

                </Collapse>
            </List>
        ))}

    </>
);

export const KidsAccessories = (
    <>
        {kidsAccessoriesProducts.map(category => (
            <List component="div"
                  disablePadding
            >
                <ListItem button
                          onClick={handleOpenKidsAccessories}
                >
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            width: "100%"
                        }}
                    >
                        <span> {category.title} </span>
                        {openKidsAccessories ?
                            <AiOutlineMinus/> :
                            <BsPlus/>}
                    </div>
                </ListItem>
                <Collapse in={openKidsAccessories}
                          timeout="auto"
                          unmountOnExit
                >
                    {category.productsData.map(data => (
                        <List component="div"
                              disablePadding
                        >
                            <Link href={data.link}>
                                <ListItem button>
                                    <ListItemIcon>
                                        <span>{data.title}</span>
                                    </ListItemIcon>
                                </ListItem>
                            </Link>
                        </List>
                    ))}
                </Collapse>
            </List>
        ))}
    </>
);

export const OtherProducts = (
    <>
        {otherProducts.map(category => (
            <List>
                <ListItem button
                          onClick={handleOpenOtherCategories}
                >
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            width: "100%"
                        }}
                    >
                        <span>{category.title}</span>
                        {openOtherCategories ?
                            <AiOutlineMinus/> :
                            <BsPlus/>}
                    </div>
                </ListItem>
                <Collapse in={openOtherCategories}
                          timeout="auto"
                          unmountOnExit
                >
                    {category.productsData.map(data => (
                        <Link href={data.link}>
                            <ListItem button>
                                <ListItemIcon>
                                    <span>{data.title}</span>
                                </ListItemIcon>
                            </ListItem>
                        </Link>
                    ))}
                </Collapse>
            </List>
        ))}
    </>
)