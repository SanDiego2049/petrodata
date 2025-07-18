import newsImage1 from "../assets/news_image.png";
import newsImage2 from "../assets/oando.png";
import newsImage3 from "../assets/dangote.png";
import newsImage4 from "../assets/News widget.png";

const mockNews = {
  PMS: [
    {
      headline: "Heirs Energies doubles oil production – Official",
      summary:
        "Heirs Energies manages 5% of Nigeria’s oil production and a similar share of domestic gas production.",
      image: newsImage1,
    },
    {
      headline: "NMDPRA approves new price band for PMS nationwide",
      summary:
        "The agency sets a cap-and-floor system to prevent hoarding and stabilize PMS distribution.",
      image: newsImage2,
    },
    {
      headline: "Marketers predict stable fuel supply into Q4 2025",
      summary:
        "Distributors expect stable supply citing improved import coordination.",
      image: newsImage3,
    },
    {
      headline: "NNPC announces fresh import contracts for PMS",
      summary:
        "The NNPC has finalized import deals to shore up national stock levels.",
      image: newsImage4,
    },
    {
      headline: "Petrol demand rises as holiday season approaches",
      summary: "PMS consumption surges with increased inter-state travel.",
      image: newsImage1,
    },
  ],

  AGO: [
    {
      headline: "Diesel prices decline as global crude eases",
      summary: "Lower crude prices are now reflected in diesel depot rates.",
      image: newsImage2,
    },
    {
      headline: "Truck drivers protest over AGO levies in North",
      summary:
        "Transporters protest multiple taxes on diesel at northern entry points.",
      image: newsImage3,
    },
    {
      headline: "Depot owners call for regulation of AGO pricing",
      summary:
        "Operators urge the government to monitor AGO pricing irregularities.",
      image: newsImage4,
    },
    {
      headline: "Port congestion delays AGO distribution to East",
      summary:
        "Import bottlenecks are affecting diesel movement to eastern markets.",
      image: newsImage1,
    },
    {
      headline: "Marketers consider AGO bulk discount",
      summary:
        "Bulk discounts for AGO may be introduced in high-volume regions.",
      image: newsImage2,
    },
  ],

  DPK: [
    {
      headline: "Kerosene demand spikes in rural Nigeria",
      summary:
        "Lack of LPG access leads to kerosene reliance in remote communities.",
      image: newsImage3,
    },
    {
      headline: "FG mulls subsidy return for DPK consumers",
      summary: "The government considers subsidy options for kerosene users.",
      image: newsImage4,
    },
    {
      headline: "Black market sales of DPK raise safety concerns",
      summary: "Officials warn against illegal kerosene distribution.",
      image: newsImage1,
    },
    {
      headline: "DPK distributors warn of supply shortage",
      summary: "Suppliers cite logistical delays in restocking DPK nationwide.",
      image: newsImage2,
    },
    {
      headline: "Retailers push for DPK price monitoring",
      summary: "Calls for improved price tracking and transparency.",
      image: newsImage3,
    },
  ],

  LPG: [
    {
      headline: "Cooking gas price drops 10% in Lagos depots",
      summary: "Local LPG pricing drops due to increased supply.",
      image: newsImage4,
    },
    {
      headline: "NLNG resumes full LPG supply after maintenance",
      summary: "Domestic supply stabilizes after planned downtime at NLNG.",
      image: newsImage1,
    },
    {
      headline: "LPG adoption rises as kerosene use declines",
      summary: "Clean fuel use improves due to awareness and incentives.",
      image: newsImage2,
    },
    {
      headline: "New LPG terminals to open in Warri and PH",
      summary: "New terminals to enhance LPG distribution nationwide.",
      image: newsImage3,
    },
    {
      headline: "Stakeholders propose price benchmark for LPG",
      summary: "Experts recommend LPG pricing floor to prevent volatility.",
      image: newsImage4,
    },
  ],
};

export default mockNews;
