const convertIDR = (value: number) => {
    return new Intl.NumberFormat("id-ID", {
        style: "currency", 
        currency: "IDR",
        maximumFractionDigits: 0, // Remove decimal place
    }).format(value);
};

export { convertIDR };