const convertIDR = (value: number) => {
    return new Intl.NumberFormat("id-ID", {
        style: "currency", 
        currency: "IDR",
        maximumFractionDigits: 0, // Remove decimal places
    }).format(value);
};

export { convertIDR };