import React from "react";

export default function Footer() {
    return (
        <footer className="bg-gray-800 text-white py-4">
            <div className="container mx-auto text-center">
                <p className="text-sm">
                    &copy; {new Date().getFullYear()} Notions. All rights
                    reserved.
                </p>
                <div className="mt-2">
                    <a
                        href="#"
                        className="text-gray-400 hover:text-gray-300 mx-2">
                        Privacy Policy
                    </a>
                    <a
                        href="#"
                        className="text-gray-400 hover:text-gray-300 mx-2">
                        Terms of Service
                    </a>
                </div>
            </div>
        </footer>
    );
};
